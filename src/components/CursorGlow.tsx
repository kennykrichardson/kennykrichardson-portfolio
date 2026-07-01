import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    tick();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
