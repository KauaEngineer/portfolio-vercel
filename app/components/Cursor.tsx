"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const springConfig = { damping: 26, stiffness: 450, mass: 0.18 };
  const dotX = useSpring(0, { damping: 50, stiffness: 500, mass: 0.1 });
  const dotY = useSpring(0, { damping: 50, stiffness: 500, mass: 0.1 });
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onHoverStart = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) setHovered(true);
    };
    const onHoverEnd = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) setHovered(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Dot — preciso */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0 : 1 }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>

      {/* Ring — com delay spring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovered ? 2.5 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3, ease: "easeOut" } }}
      >
        <div className="w-8 h-8 rounded-full border border-white/60" />
      </motion.div>
    </>
  );
}
