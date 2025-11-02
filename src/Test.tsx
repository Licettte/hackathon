// FrostGlassMotion.tsx
import React from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";

export function FrostGlassMotion({
  width = 420,
  height = 220,
  radius = 18,
}: { width?: number; height?: number; radius?: number }) {
  const mx = useMotionValue(0), my = useMotionValue(0), hover = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 18 });
  const scale = useSpring(useTransform(hover, [0, 1], [1, 1.02]), { stiffness: 260, damping: 20 });
  const borderA = useTransform(hover, [0, 1], [0.18, 0.34]);
  const glow = useTransform(hover, [0, 1], [0.14, 0.42]);
  const outlineCss = useMotionTemplate`1px solid rgba(255,255,255, ${borderA})`;
  const boxShadowCss = useTransform(glow, g => `0 28px 80px rgba(0,0,0, ${0.25 + g * 0.45})`);

  const noiseSvg = encodeURI(
    "data:image/svg+xml;utf8," +
        "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
        "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>" +
        "<feColorMatrix type='saturate' values='0'/></filter>" +
        "<rect width='100%' height='100%' filter='url(%23n)' opacity='0.14'/></svg>"
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div style={{ minHeight: "100dvh", display: "grid", placeItems: "center", background: "#0b1020" }}>
      <motion.div
        onMouseMove={onMove}
        onMouseEnter={() => hover.set(1)}
        onMouseLeave={() => { hover.set(0); mx.set(0); my.set(0); }}
        style={{ width, height, perspective: 1000 }}
      >
        <motion.div
          style={{
            width: "100%", height: "100%", borderRadius: radius, overflow: "hidden",
            transformStyle: "preserve-3d", rotateX: rx, rotateY: ry, scale,
            outline: outlineCss, boxShadow: boxShadowCss,
            background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
            backdropFilter: "blur(16px) contrast(1.05) saturate(1.04)",
            WebkitBackdropFilter: "blur(16px) contrast(1.05) saturate(1.04)",
            border: "1px solid rgba(255,255,255,0.16)", position: "relative",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.12) 0 0.4px, rgba(255,255,255,0) 0.45px),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.10) 0 0.4px, rgba(255,255,255,0) 0.45px),
                url("${noiseSvg}")
              `,
              backgroundSize: "3px 3px, 3px 3px, 200px 200px",
              backgroundBlendMode: "screen, screen, multiply",
            }}
          />
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#e8ecf3" }}>
            Frosted Glass (Motion)
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
