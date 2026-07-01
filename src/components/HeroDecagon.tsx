import {
  Float,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function HeroDecagon() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  const geometry = useMemo(
    () => new THREE.CylinderGeometry(2, 2, 2.2, 10),
    []
  );

  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry),
    [geometry]
  );

  const shardPositions = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;

      return {
        angle,
        radius: 3 + Math.random() * 0.4,
        y: (Math.random() - 0.5) * 1.5,
      };
    });
  }, []);

  useFrame(({ mouse, clock }) => {
    if (!group.current || !core.current) return;

    const t = clock.elapsedTime;

    group.current.rotation.y +=
      (mouse.x * 0.6 - group.current.rotation.y) * 0.05;

    group.current.rotation.x +=
      (-mouse.y * 0.35 - group.current.rotation.x) * 0.05;

    group.current.position.y =
      Math.sin(t * 0.7) * 0.25;

    core.current.rotation.z =
      Math.sin(t * 0.3) * 0.12;
  });

  return (
    <group
    ref={group}
    position={[0.6, 0.25, 0]}
>
      <Float
        speed={1.2}
        rotationIntensity={0.2}
        floatIntensity={0.45}
      >
        {/* Main Prism */}

        <mesh
          geometry={geometry}
          ref={core}
        >
<meshPhysicalMaterial
    color="#161616"
    metalness={1}
    roughness={0.12}
    clearcoat={1}
    clearcoatRoughness={0.08}
    emissive="#330000"
    emissiveIntensity={0.25}
/>
        </mesh>

        {/* Neon Edge */}

        <lineSegments geometry={edges}>
          <lineBasicMaterial
            color="#ff2020"
            linewidth={1.5}
          />
        </lineSegments>

        {/* Core */}

        <mesh scale={0.72}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshBasicMaterial color="#ff3030" />
        </mesh>

        {/* Glow */}

        <mesh scale={1.45}>
          <sphereGeometry args={[2.1, 64, 64]} />
          <meshBasicMaterial
            color="#ff2020"
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>
      </Float>

      {/* Platform */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.25, 0]}
      >
        <cylinderGeometry
          args={[3.8, 3.8, 0.3, 64]}
        />

        <meshStandardMaterial
          color="#101010"
          metalness={0.9}
          roughness={0.2}
          emissive="#550000"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Neon Ring */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.07, 0]}
      >
        <torusGeometry
          args={[2.4, 0.05, 24, 128]}
        />

        <meshBasicMaterial
          color="#ff2020"
        />
      </mesh>

      {/* Beam */}

      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry
          args={[0.025, 0.025, 2.3]}
        />

        <meshBasicMaterial
          color="#ff4040"
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Orbiting Shards */}

      {shardPositions.map((s, i) => (
        <OrbitShard
          key={i}
          {...s}
        />
      ))}
    </group>
  );
}

function OrbitShard({
  angle,
  radius,
  y,
}: {
  angle: number;
  radius: number;
  y: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.elapsedTime;

    const a = angle + t * 0.25;

    ref.current.position.set(
      Math.cos(a) * radius,
      y + Math.sin(t + angle) * 0.15,
      Math.sin(a) * radius
    );

    ref.current.rotation.x += 0.02;

    ref.current.rotation.y += 0.03;
  });

  return (
    <mesh ref={ref}>
      <tetrahedronGeometry args={[0.12]} />
      <meshBasicMaterial
        color="#ff3030"
      />
    </mesh>
  );
}