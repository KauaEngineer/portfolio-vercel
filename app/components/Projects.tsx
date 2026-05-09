"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";

const projects = [
  {
    title: "Projeto 01",
    description: "Descrição do seu projeto. Conta o que você construiu, quais tecnologias usou e qual problema resolveu.",
    tags: ["React", "Next.js", "Tailwind"],
    color: "violet",
    placeholder: true,
  },
  {
    title: "Projeto 02",
    description: "Descrição do seu projeto. Conta o que você construiu, quais tecnologias usou e qual problema resolveu.",
    tags: ["TypeScript", "Node.js", "API"],
    color: "cyan",
    placeholder: true,
  },
  {
    title: "Projeto 03",
    description: "Descrição do seu projeto. Conta o que você construiu, quais tecnologias usou e qual problema resolveu.",
    tags: ["Figma", "UI Design", "Prototipagem"],
    color: "pink",
    placeholder: true,
  },
];

const accentMap: Record<string, string> = {
  violet: "from-violet-600/20 to-transparent border-violet-500/30 hover:border-violet-500/60",
  cyan: "from-cyan-600/20 to-transparent border-cyan-500/30 hover:border-cyan-500/60",
  pink: "from-pink-600/20 to-transparent border-pink-500/30 hover:border-pink-500/60",
};

const tagMap: Record<string, string> = {
  violet: "border-violet-500/30 text-violet-300 bg-violet-500/5",
  cyan: "border-cyan-500/30 text-cyan-300 bg-cyan-500/5",
  pink: "border-pink-500/30 text-pink-300 bg-pink-500/5",
};

const dotMap: Record<string, string> = {
  violet: "bg-violet-400",
  cyan: "bg-cyan-400",
  pink: "bg-pink-400",
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-cyan-500/30" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-4">
            Trabalhos
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  color,
  index,
}: (typeof projects)[number] & { index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
    <TiltCard className={`group relative flex flex-col p-6 rounded-2xl border bg-linear-to-b ${accentMap[color]} bg-white/2 transition-colors duration-300 cursor-pointer`}
    >
      {/* Image placeholder */}
      <div className="w-full h-44 rounded-xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-2 text-zinc-700">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs font-mono">imagem do projeto</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${dotMap[color]}`} />
        <h3 className="text-white font-bold text-lg">{title}</h3>
      </div>

      <p className="text-zinc-500 text-sm leading-relaxed mb-5 flex-1">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-0.5 text-xs rounded-full border ${tagMap[color]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow icon on hover */}
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </TiltCard>
    </motion.div>
  );
}
