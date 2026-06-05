"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Product = {
  name: string;
  description: string;
};

type Role = {
  company: string;
  title: string;
  period: string;
  summary: string;
  products: Product[];
};

const roles: Role[] = [
  {
    company: "Orbitmind",
    title: "Desenvolvedor Full-Stack Pleno · Software & IA",
    period: "Atual",
    summary:
      "Construção de plataformas de IA que rodam em produção atendendo necessidades reais de negócio. Atuação ponta a ponta — do design de arquitetura ao deploy — em produtos multi-tenant com integração de múltiplos LLMs.",
    products: [
      {
        name: "Adalink",
        description:
          "Plataforma de agentes de IA omnichannel para WhatsApp. Integração de múltiplos provedores de LLM e arquitetura do frontend moderno.",
      },
      {
        name: "Vektus",
        description:
          "Document Intelligence com pipelines de RAG, embeddings vetoriais e recuperação semântica de documentos.",
      },
      {
        name: "ComplianceCore",
        description: "SaaS de compliance multi-vertical.",
      },
      {
        name: "NexBot · Synthex",
        description: "Iniciativas adicionais de produto dentro do portfólio da Orbitmind.",
      },
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-cyan-500/30" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-4">
            Trajetória
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Experiência <span className="gradient-text">Profissional</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {roles.map((role, i) => (
            <RoleCard key={role.company} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleCard({ role, index }: { role: Role; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 hover:border-white/20 transition-colors"
    >
      <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="text-2xl font-bold text-white">{role.company}</h3>
          <p className="text-zinc-400 text-sm mt-1">{role.title}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {role.period}
        </span>
      </header>

      <p className="text-zinc-400 leading-relaxed mb-8">{role.summary}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {role.products.map((product) => (
          <div
            key={product.name}
            className="rounded-xl border border-white/5 bg-white/[0.01] p-5"
          >
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {product.name}
            </h4>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}
