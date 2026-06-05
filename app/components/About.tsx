"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import RecommendationModal from "./RecommendationModal";

const slideLeft  = { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } } };
const slideRight = { hidden: { opacity: 0, x: 40  }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-100 h-100 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Photo column */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={slideLeft}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-violet-500/20">
              <Image
                src="/profile.png"
                alt="Foto de Kauã"
                width={320}
                height={320}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-violet-500" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-violet-500" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-violet-500" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-violet-500" />
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-violet-500/20 bg-violet-500/3 p-5">
            <svg className="w-5 h-5 text-violet-400/60 mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.988 4.145-4.249 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.746-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.988 4.145-4.249 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.746-1.179z" />
            </svg>
            <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">
              Está entre os profissionais mais competentes e confiáveis com quem já trabalhei.
            </p>
            <p className="text-zinc-500 text-xs">
              <span className="text-zinc-300">Wesley Santos</span> · Fundador, Orbitmind
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/30 text-violet-300 hover:text-white hover:border-violet-500/60 hover:bg-violet-500/10 text-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ler cartas completas
          </button>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="flex flex-col gap-6"
        >
          <motion.h2 variants={slideRight} className="text-4xl md:text-5xl font-black text-white">
            Engenharia com <span className="gradient-text">profundidade</span>.
          </motion.h2>

          <motion.p variants={slideRight} className="text-zinc-400 leading-relaxed">
            Sou desenvolvedor Full-Stack focado em IA. Trabalho na construção de plataformas que
            rodam em produção e resolvem problemas reais de negócio — agentes omnichannel, Document
            Intelligence, sistemas de compliance multi-vertical.
          </motion.p>

          <motion.p variants={slideRight} className="text-zinc-400 leading-relaxed">
            Domino a stack moderna de IA aplicada: TypeScript no front e no back com Next.js e NestJS,
            PostgreSQL, integração de múltiplos provedores de LLM e pipelines de RAG com embeddings
            vetoriais e recuperação semântica.
          </motion.p>

          <motion.p variants={slideRight} className="text-zinc-400 leading-relaxed">
            Mas vou além do código que compila. Aplico Clean Code, SOLID e boas práticas de testes
            e observabilidade. Penso a arquitetura como um todo, antecipo problemas e busco a solução
            correta no lugar do atalho mais fácil.
          </motion.p>

          <motion.div variants={slideRight} className="flex flex-wrap gap-3 pt-2">
            {["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Vercel AI SDK", "pgvector"].map((tag) => (
              <span key={tag} className="px-3 py-1 text-sm rounded-full border border-violet-500/30 text-violet-300 bg-violet-500/5">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {modalOpen && <RecommendationModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
