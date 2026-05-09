"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function RecommendationModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={onClose}
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-violet-500" />
            <p className="text-violet-400 text-xs font-mono tracking-widest uppercase">Carta de Recomendação</p>
          </div>

          {/* Placeholder */}
          <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
            <div className="w-14 h-14 rounded-full border border-dashed border-white/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-zinc-500 text-sm">A carta de recomendação será adicionada em breve.</p>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white/30 text-sm transition-all duration-300"
          >
            Fechar
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
