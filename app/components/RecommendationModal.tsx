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
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl"
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

          {/* PDF viewer */}
          <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-white/10 bg-white">
            <iframe
              src="/carta-recomendacao.pdf#zoom=page-width"
              className="w-full h-full min-h-[75vh]"
              title="Carta de recomendação — Ceres Brasil"
            />
          </div>

          <p className="text-zinc-500 text-xs mt-3 text-center">
            A assinatura digital fica nítida no PDF original — abre em nova aba ou baixa para conferir.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <a
              href="/carta-recomendacao.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/60 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M14 5h5v5M19 5L10 14M5 5h4M5 19h14v-4" />
              </svg>
              Abrir em nova aba
            </a>
            <a
              href="/carta-recomendacao.pdf"
              download="carta-recomendacao-kaua-santos.pdf"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Baixar PDF
            </a>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 text-sm transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
