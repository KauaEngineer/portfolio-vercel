"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Line =
  | { type: "cmd"; text: string }
  | { type: "output"; text: string }
  | { type: "gap" };

const sequence: Line[] = [
  { type: "cmd", text: "init portfolio.exe" },
  { type: "output", text: "Carregando sistema..." },
  { type: "output", text: "OK — sistema pronto." },
  { type: "gap" },
  { type: "cmd", text: "whoami" },
  { type: "output", text: "Kauã — Dev & Designer" },
  { type: "gap" },
  { type: "cmd", text: "cat sobre.txt" },
  { type: "output", text: "Estudante apaixonado por código e design." },
  { type: "output", text: "Crio interfaces bonitas com código limpo." },
  { type: "output", text: "Sempre aprendendo, sempre construindo." },
  { type: "gap" },
  { type: "cmd", text: "ls skills/" },
  { type: "output", text: "react/   nextjs/   typescript/   figma/   css/" },
  { type: "gap" },
  { type: "cmd", text: "status --disponibilidade" },
  { type: "output", text: "✓ Disponível para novos projetos." },
  { type: "gap" },
];

const CMD_SPEED = 55;
const OUTPUT_DELAY = 180;
const LINE_DELAY = 120;

export default function HeroTerminal() {
  const router = useRouter();
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentIndex >= sequence.length) {
      setTimeout(() => setDone(true), 600);
      return;
    }

    const line = sequence[currentIndex];

    if (line.type === "gap") {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentIndex((i) => i + 1);
      }, LINE_DELAY);
      return () => clearTimeout(t);
    }

    if (line.type === "output") {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentIndex((i) => i + 1);
      }, OUTPUT_DELAY);
      return () => clearTimeout(t);
    }

    if (line.type === "cmd") {
      let charIndex = 0;
      setTypingText("");

      const type = () => {
        charIndex++;
        setTypingText(line.text.slice(0, charIndex));
        if (charIndex < line.text.length) {
          setTimeout(type, CMD_SPEED);
        } else {
          setTimeout(() => {
            setVisibleLines((prev) => [...prev, line]);
            setTypingText("");
            setCurrentIndex((i) => i + 1);
          }, 300);
        }
      };

      const t = setTimeout(type, LINE_DELAY);
      return () => clearTimeout(t);
    }
  }, [currentIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Scanlines overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 scanlines" />

      {/* Subtle green glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-green-500/5 blur-[120px]" />
      </div>

      <div className="relative z-20 w-full max-w-3xl mx-auto px-6 py-20">
        {/* Terminal window chrome */}
        <div className="rounded-xl overflow-hidden border border-green-500/20 shadow-2xl shadow-green-500/5">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950 border-b border-green-500/10">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-green-500/40 font-mono tracking-widest">
              portfolio.exe — bash
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-black/95 px-6 py-6 min-h-[420px] font-mono text-sm leading-7">
            {visibleLines.map((line, i) => {
              if (line.type === "gap") return <div key={i} className="h-2" />;
              if (line.type === "cmd")
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-500 select-none">$</span>
                    <span className="text-green-300">{line.text}</span>
                  </div>
                );
              return (
                <div key={i} className="flex items-start gap-2 pl-4">
                  <span className="text-green-500/30 select-none">›</span>
                  <span className="text-green-400/80">{line.text}</span>
                </div>
              );
            })}

            {/* Linha sendo digitada */}
            {!done && currentIndex < sequence.length && sequence[currentIndex].type === "cmd" && (
              <div className="flex items-start gap-2">
                <span className="text-green-500 select-none">$</span>
                <span className="text-green-300">{typingText}</span>
                <span className="animate-blink text-green-400">█</span>
              </div>
            )}

            {/* Cursor idle quando não está digitando */}
            {!done && currentIndex < sequence.length && sequence[currentIndex].type !== "cmd" && (
              <div className="flex items-start gap-2">
                <span className="text-green-500 select-none">$</span>
                <span className="animate-blink text-green-400">█</span>
              </div>
            )}

            {/* CTA após terminar */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 flex flex-col sm:flex-row items-start gap-4"
                >
                  <button
                    onClick={() => router.replace("/portfolio")}
                    className="group flex items-center gap-2 px-6 py-2.5 rounded border border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all duration-200 text-sm font-mono"
                  >
                    <span className="text-green-600 select-none">$</span>
                    <span>entrar_no_portfolio<span className="animate-blink">█</span></span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
