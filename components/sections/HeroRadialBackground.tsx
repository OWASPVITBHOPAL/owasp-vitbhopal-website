"use client";

import React, { useEffect, useRef } from "react";

export const HeroRadialBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Animation state refs (no re-renders during 60/120fps render loop)
  const animState = useRef({
    offset: 0,
    time: 0,
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    pingRadius: 0,
    pingAlpha: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Handle high-DPI razor-sharp rendering across the top page hero region
    const handleResize = () => {
      width = window.innerWidth;
      height =
        container.offsetHeight || Math.max(window.innerHeight * 1.35, 1100);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Default focal center matching hero headline (~22% X, ~48% viewport Y)
      const defaultX = width * 0.22;
      const defaultY = Math.round(window.innerHeight * 0.48);
      animState.current.targetX = defaultX;
      animState.current.targetY = defaultY;
      if (animState.current.currentX === 0) {
        animState.current.currentX = defaultX;
        animState.current.currentY = defaultY;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Subtle parallax tilt responding to mouse cursor
    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / width - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;

      const defaultX = width * 0.22;
      const defaultY = Math.round(window.innerHeight * 0.48);
      const maxShiftX = width * 0.055;
      const maxShiftY = 40;

      animState.current.targetX = defaultX + normX * maxShiftX;
      animState.current.targetY = defaultY + normY * maxShiftY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Wave parameters: 26px spacing, smooth 0.18 expansion speed
    const SPACING = 26;
    const SPEED = 0.18;

    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      animState.current.time += dt;
      const time = animState.current.time;

      const defaultX = width * 0.22;
      const defaultY = Math.round(window.innerHeight * 0.48);

      // Idle breathing float
      animState.current.targetX =
        defaultX + Math.sin(time * 0.35) * (width * 0.02);
      animState.current.targetY = defaultY + Math.cos(time * 0.5) * 20;

      // Smooth soft spring interpolation
      animState.current.currentX +=
        (animState.current.targetX - animState.current.currentX) * 0.04;
      animState.current.currentY +=
        (animState.current.targetY - animState.current.currentY) * 0.04;

      // Continuous outward ripple offset
      animState.current.offset = (animState.current.offset + SPEED) % SPACING;

      // Periodic gentle wave shimmer (every ~6s)
      const pingPeriod = 6.0;
      const pingTime = time % pingPeriod;
      if (pingTime < 3.5) {
        const progress = pingTime / 3.5;
        animState.current.pingRadius =
          progress * (Math.max(width, height) * 1.1);
        animState.current.pingAlpha = Math.sin(progress * Math.PI) * 0.045;
      } else {
        animState.current.pingAlpha = 0;
      }

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      const cx = animState.current.currentX;
      const cy = animState.current.currentY;

      // Max radius to span all canvas corners
      const maxRadius =
        Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy)) +
        SPACING;

      // Draw concentric rings
      const startRadius = animState.current.offset;

      ctx.lineWidth = 1;

      for (let r = startRadius; r <= maxRadius; r += SPACING) {
        if (r <= 0) continue;

        // Smooth radial edge fade-out into deep black
        const distRatio = r / maxRadius;
        const edgeFade = Math.max(0, 1 - Math.pow(distRatio, 1.25));

        // Subtle silver metallic tone
        let alpha = 0.04 * edgeFade;

        // Check if ring intersects current soft ping shimmer
        if (animState.current.pingAlpha > 0) {
          const pingDiff = Math.abs(r - animState.current.pingRadius);
          if (pingDiff < 60) {
            const pingBoost = (1 - pingDiff / 60) * animState.current.pingAlpha;
            alpha += pingBoost * edgeFade;
          }
        }

        ctx.strokeStyle = `rgba(171, 171, 171, ${alpha.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute top-0 left-0 -z-10 h-[155vh] min-h-[1250px] w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 72%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
      />
    </div>
  );
};
