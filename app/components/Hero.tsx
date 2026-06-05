"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const firstName = "Kauã".split("");
const lastName  = "Santos".split("");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY       = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleY   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const allLetters = [...firstName, " ", ...lastName];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Content */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 text-center px-6 max-w-5xl">

        {/* Name — letter by letter */}
        <h1 className="text-[clamp(1.75rem,5.5vw,4.5rem)] font-bold text-white tracking-tight leading-none mb-4 flex justify-center gap-[0.25em]">
          <span className="flex">
            {firstName.map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                style={{ display: "inline-block", willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
              >
                {letter}
              </motion.span>
            ))}
          </span>

          <span className="flex">
            {lastName.map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 + (firstName.length + 1 + i) * 0.06, ease: [0.33, 1, 0.68, 1] }}
                style={{ display: "inline-block", willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 + allLetters.length * 0.06, ease: [0.33, 1, 0.68, 1] }}
              style={{ display: "inline-block", willChange: "transform, opacity", backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
              className="text-white/40"
            >
              .
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.div style={{ y: subtitleY }}>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="text-sm text-white/30 font-light tracking-[0.2em] mb-8 uppercase"
          >
            Full-Stack &nbsp;·&nbsp; IA
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="text-white/50 text-base max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Construindo plataformas com LLMs, RAG e agentes em produção.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-emerald-400"
              />
              <span className="text-emerald-300 text-sm font-medium">Disponível para projetos</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">scroll</p>
        <motion.svg
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-5 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
