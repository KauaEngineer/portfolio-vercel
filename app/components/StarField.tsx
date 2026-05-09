"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
}

const NUM_STARS = 200;
const SPEED     = 0.4; // lower = slower

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const cx = () => W / 2;
    const cy = () => H / 2;

    // Initialize stars spread across z-depth
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x:  (Math.random() - 0.5) * W,
      y:  (Math.random() - 0.5) * H,
      z:  Math.random() * W,
      px: 0,
      py: 0,
    }));

    const resetStar = (s: Star) => {
      s.x  = (Math.random() - 0.5) * W;
      s.y  = (Math.random() - 0.5) * H;
      s.z  = W;
      s.px = s.x / s.z * W + cx();
      s.py = s.y / s.z * H + cy();
    };

    // Set initial previous positions
    stars.forEach((s) => {
      s.px = s.x / s.z * W + cx();
      s.py = s.y / s.z * H + cy();
    });

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        s.px = s.x / s.z * W + cx();
        s.py = s.y / s.z * H + cy();

        // Move closer (z decreasing = coming toward viewer)
        s.z -= SPEED;

        if (s.z <= 0) {
          resetStar(s);
          return;
        }

        const nx = s.x / s.z * W + cx();
        const ny = s.y / s.z * H + cy();

        // Depth-based size & brightness
        const size       = Math.max(0.4, (1 - s.z / W) * 2.5);
        const brightness = Math.floor((1 - s.z / W) * 220 + 35);
        const alpha      = (1 - s.z / W) * 0.9 + 0.05;

        // Trail line for depth effect
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${brightness},${brightness},${brightness},${alpha * 0.5})`;
        ctx.lineWidth   = size * 0.6;
        ctx.moveTo(s.px, s.py);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Star dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${alpha})`;
        ctx.arc(nx, ny, size, 0, Math.PI * 2);
        ctx.fill();

        // Out of bounds → reset
        if (nx < 0 || nx > W || ny < 0 || ny > H) resetStar(s);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
