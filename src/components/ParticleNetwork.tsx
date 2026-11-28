import { useEffect, useRef, type CSSProperties } from "react";

export type ParticleNetworkProps = {
  /** Overall line and point visibility. */
  opacity?: number;
  /** Particle drift speed. 1 is slow and subtle; higher values move faster. */
  speed?: number;
  /** Particle density multiplier. */
  density?: number;
  /** Maximum distance at which particles can connect, in CSS pixels. */
  connectionDistance?: number;
  /** Optional CSS class and inline positioning overrides. */
  className?: string;
  style?: CSSProperties;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  pulse: number;
};

type Edge = {
  a: number;
  b: number;
  distance: number;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function createParticles(width: number, height: number, density: number): Particle[] {
  const area = width * height;
  // Keep the 40% connection-density baseline, then scale particle count by viewport.
  // Mobile (< 768px): 25% fewer particles. Half-desktop (768px–1350px): 15% fewer.
  // Full desktop remains unchanged.
  const viewportWidth = window.innerWidth;
  const viewportFactor =
    viewportWidth < 768 ? 0.75 :
    viewportWidth <= 1350 ? 0.85 :
    1;
  const baseCount = (area / 10500) * density * 1.4;
  const count = Math.round(clamp(baseCount * viewportFactor, 90 * viewportFactor, 308 * viewportFactor));

  // Start with a loose grid to prevent large empty patches, then add small,
  // uneven offsets so the distribution feels organic rather than uniform.
  const aspectRatio = width / Math.max(height, 1);
  const columns = Math.max(1, Math.round(Math.sqrt(count * aspectRatio)));
  const rows = Math.ceil(count / columns);
  const cellWidth = width / columns;
  const cellHeight = height / rows;

  const positions = Array.from({ length: count }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    // Wider placement range adds natural variation while retaining broad coverage.
    let x = (column + random(0.08, 0.92)) * cellWidth;
    let y = (row + random(0.08, 0.92)) * cellHeight;

    // A minority of particles drift farther from their cell centers, creating
    // subtle local clusters and gaps without letting the whole field clump up.
    if (Math.random() < 0.18) {
      x += random(-0.28, 0.28) * cellWidth;
      y += random(-0.28, 0.28) * cellHeight;
    }

    return {
      x: clamp(x, 0, width),
      y: clamp(y, 0, height),
    };
  });

  // Shuffle the positions so the grid does not read as rows or columns.
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  return positions.map(({ x, y }) => {
    const angle = random(0, Math.PI * 2);
    const velocity = random(5.5, 13.5);

    return {
      x: clamp(x, 0, width),
      y: clamp(y, 0, height),
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      radius: random(0.75, 1.55),
      phase: random(0, Math.PI * 2),
      pulse: random(0.45, 1),
    };
  });
}

function buildEdges(particles: Particle[], maxDistance: number): Edge[] {
  const maxDistanceSquared = maxDistance * maxDistance;
  const edges = new Map<string, Edge>();

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    const nearby: { index: number; distance: number }[] = [];

    for (let j = 0; j < particles.length; j++) {
      if (i === j) continue;
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared < maxDistanceSquared) {
        nearby.push({ index: j, distance: Math.sqrt(distanceSquared) });
      }
    }

    nearby.sort((left, right) => left.distance - right.distance);

    // Increase connection count by approximately 40%: each particle selects
    // four links, with a fifth link on 53.6% of particles (average 4.536 vs 3.24).
    // This thickens the network geometry without adding more particles.
    const linkCount = Math.random() < 0.536 ? 5 : 4;
    for (const neighbour of nearby.slice(0, linkCount)) {
      const low = Math.min(i, neighbour.index);
      const high = Math.max(i, neighbour.index);
      const key = `${low}:${high}`;
      if (!edges.has(key)) {
        edges.set(key, { a: low, b: high, distance: neighbour.distance });
      }
    }
  }

  return Array.from(edges.values());
}

const componentStyles = `
.particle-network {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
  pointer-events: none;
  contain: strict;
}
.particle-network canvas {
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.particle-network-content {
  position: relative;
  z-index: 1;
}
.particle-network-content .page-shell {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.56);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}
`;

export default function ParticleNetwork({
  opacity = 0.9,
  speed = 0.65,
  density = 1,
  connectionDistance,
  className = "",
  style,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let particles: Particle[] = [];
    let frameId = 0;
    let previousTime = 0;
    let elapsed = 0;
    let disposed = false;
    let isAnimating = true;
    let lastEdgeBuild = 0;
    let cachedEdges: Edge[] = [];
    let previousViewportFactor =
      window.innerWidth < 768 ? 0.75 :
      window.innerWidth <= 1350 ? 0.85 :
      1;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const nextWidth = Math.max(1, bounds.width || window.innerWidth);
      const nextHeight = Math.max(1, bounds.height || window.innerHeight);
      const oldWidth = width;
      const oldHeight = height;
      width = nextWidth;
      height = nextHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const nextViewportFactor =
        window.innerWidth < 768 ? 0.75 :
        window.innerWidth <= 1350 ? 0.85 :
        1;

      if (
        particles.length &&
        oldWidth > 1 &&
        oldHeight > 1 &&
        nextViewportFactor === previousViewportFactor
      ) {
        const sx = width / oldWidth;
        const sy = height / oldHeight;
        particles.forEach(particle => {
          particle.x *= sx;
          particle.y *= sy;
        });
      } else {
        particles = createParticles(width, height, density);
      }

      previousViewportFactor = nextViewportFactor;

      cachedEdges = [];
      lastEdgeBuild = 0;
      if (!isAnimating) drawFrame(performance.now(), true);
    };

    const getConnectionDistance = () =>
      connectionDistance ?? clamp(Math.min(width, height) * 0.285, 112, 190);

    const drawFrame = (time: number, staticFrame = false) => {
      if (disposed) return;

      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.04)
        : 0;
      previousTime = time;

      if (!staticFrame && isAnimating) {
        elapsed += delta * speed;

        for (const particle of particles) {
          particle.x += particle.vx * delta * speed;
          particle.y += particle.vy * delta * speed;

          // Softly wrap points across the edges so the network never visibly resets.
          const margin = 24;
          if (particle.x < -margin) particle.x = width + margin;
          if (particle.x > width + margin) particle.x = -margin;
          if (particle.y < -margin) particle.y = height + margin;
          if (particle.y > height + margin) particle.y = -margin;

          // A tiny curved drift makes the network feel alive without looking busy.
          const drift = Math.sin(elapsed * 0.38 + particle.phase) * 2.2;
          particle.x += drift * delta;
          particle.y += Math.cos(elapsed * 0.31 + particle.phase) * 1.5 * delta;
        }
      }

      const now = time;
      if (cachedEdges.length === 0 || now - lastEdgeBuild > 100) {
        cachedEdges = buildEdges(particles, getConnectionDistance());
        lastEdgeBuild = now;
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      // Very faint atmospheric points give depth without introducing a gradient wash.
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const pulse = 0.76 + Math.sin(elapsed * 0.75 + particle.phase) * 0.12;
        const alpha = opacity * pulse * particle.pulse;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(229, 9, 20, ${alpha})`;
        context.fill();
      }

      // Draw hairline connections in three distance bands. Nearby links read crisp;
      // longer links recede gently, creating the layered geometric-web effect.
      context.lineWidth = 0.72;
      context.lineCap = "round";
      const linkRange = getConnectionDistance();
      const bands = [
        { limit: 0.44, alpha: 0.48 },
        { limit: 0.74, alpha: 0.31 },
        { limit: 1.0, alpha: 0.18 },
      ];
      let previousLimit = 0;
      for (const band of bands) {
        context.beginPath();
        for (const edge of cachedEdges) {
          const normalized = edge.distance / linkRange;
          if (normalized <= previousLimit || normalized > band.limit) continue;
          const a = particles[edge.a];
          const b = particles[edge.b];
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
        }
        context.strokeStyle = `rgba(229, 9, 20, ${opacity * band.alpha})`;
        context.stroke();
        previousLimit = band.limit;
      }

      // A sparse set of brighter joints gives the network the crisp white pinpoints
      // in the reference image.
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        if (i % 3 !== 0) continue;
        const shimmer = 0.68 + 0.32 * Math.sin(elapsed * 1.1 + particle.phase);
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 1.12, 0, Math.PI * 2);
        context.fillStyle = `rgba(229, 9, 20, ${opacity * shimmer})`;
        context.fill();
      }

      if (isAnimating && !staticFrame) {
        frameId = window.requestAnimationFrame(next => drawFrame(next));
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    isAnimating = !reducedMotion.matches;
    if (isAnimating) {
      frameId = window.requestAnimationFrame(next => drawFrame(next));
    } else {
      drawFrame(performance.now(), true);
    }

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      window.cancelAnimationFrame(frameId);
      previousTime = 0;
      isAnimating = !event.matches;
      if (isAnimating) {
        frameId = window.requestAnimationFrame(next => drawFrame(next));
      } else {
        drawFrame(performance.now(), true);
      }
    };

    reducedMotion.addEventListener?.("change", onMotionPreferenceChange);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      reducedMotion.removeEventListener?.("change", onMotionPreferenceChange);
    };
  }, [opacity, speed, density, connectionDistance]);

  return (
    <>
      <style>{componentStyles}</style>
      <div
        className={`particle-network${className ? ` ${className}` : ""}`}
        style={style}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} />
        <div className="particle-network__ambient" />
        <div className="particle-network__grid" />
      </div>
    </>
  );
}
