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
        <h1 className="text-[clamp(3.5rem,11vw,9rem)] font-bold text-white tracking-tight leading-none mb-4 flex justify-center gap-[0.25em]">
          <span className="flex">
            {firstName.map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
          </span>

          <span className="flex">
            {lastName.map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 + (firstName.length + 1 + i) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.6 + allLetters.length * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block" }}
              className="text-white/40"
            >
              .
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.div style={{ y: subtitleY }}>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 1.8 }}
            className="text-sm text-white/30 font-light tracking-[0.2em] mb-10 uppercase"
          >
            Dev &nbsp;×&nbsp; Designer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.2 }}
            className="text-white/20 text-base max-w-md mx-auto mb-14 leading-relaxed"
          >
            Criando interfaces bonitas com código limpo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="flex justify-center"
          >
            <button
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
              className="px-8 py-3 rounded-full bg-white text-black font-medium text-sm transition-all duration-500 hover:bg-white/80 hover:-translate-y-0.5"
            >
              Ver projetos
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.2 }}
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
