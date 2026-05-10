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

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 text-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ver carta de recomendação
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
            Código com <span className="gradient-text">propósito</span>.
          </motion.h2>

          <motion.p variants={slideRight} className="text-zinc-400 leading-relaxed">
            Desde cedo desenvolvi um forte senso de responsabilidade e compromisso com tudo o que faço.
            Ao longo da minha trajetória, sempre me destaquei por não trabalhar apenas pelo salário ou
            pelo curto prazo, mas por enxergar cada oportunidade como um passo importante para o meu
            crescimento e para a construção do meu futuro.
          </motion.p>

          <motion.p variants={slideRight} className="text-zinc-400 leading-relaxed">
            Tenho como pilares a pontualidade, disciplina e constância. Busco sempre entregar mais do
            que o esperado, com foco em qualidade, organização e eficiência — sempre pensando em como
            otimizar processos e gerar valor real.
          </motion.p>

          <motion.p variants={slideRight} className="text-zinc-400 leading-relaxed">
            Acredito que resultados consistentes vêm de dedicação diária, aprendizado contínuo e
            mentalidade de evolução. Por isso, encaro cada desafio como uma oportunidade de crescimento,
            sempre alinhando meus objetivos pessoais com os objetivos da empresa.
          </motion.p>

          <motion.div variants={slideRight} className="flex flex-wrap gap-3 pt-2">
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"].map((tag) => (
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
