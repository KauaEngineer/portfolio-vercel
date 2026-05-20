"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import TiltCard from "./TiltCard";

type Project = {
  title: string;
  description: string;
  tags: string[];
  color: "violet" | "amber";
  image: string;
  github: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "Travel Planner",
    description:
      "Roteiros de viagem personalizados com IA: orçamento detalhado, hospedagem e gastronomia, com imagens reais via Wikidata + Pexels. Desenhado com modelo de afiliados (Booking, Skyscanner) pra escalar comercialmente.",
    tags: ["Node.js", "Express", "Gemini AI", "Wikidata"],
    color: "amber",
    image: "/travel-planner.png",
    github: "https://github.com/KauaEngineer/travel-planner",
    live: "https://travel-planner-ggf3.onrender.com/",
  },
  {
    title: "Chatbot Portfolio",
    description:
      "Chatbot multi-LLM com RAG nos seus documentos. Suba PDFs e markdown e converse com Gemini, Claude e outros provedores, com tool use, streaming e artefatos versionados editáveis.",
    tags: ["Next.js 15", "Vercel AI SDK", "pgvector", "RAG"],
    color: "violet",
    image: "/chatbot-portfolio.png",
    github: "https://github.com/KauaEngineer/chatbot-portfolio",
  },
];

const accentMap: Record<Project["color"], string> = {
  violet: "from-violet-600/20 to-transparent border-violet-500/30 hover:border-violet-500/60",
  amber: "from-amber-600/20 to-transparent border-amber-500/30 hover:border-amber-500/60",
};

const tagMap: Record<Project["color"], string> = {
  violet: "border-violet-500/30 text-violet-300 bg-violet-500/5",
  amber: "border-amber-500/30 text-amber-300 bg-amber-500/5",
};

const dotMap: Record<Project["color"], string> = {
  violet: "bg-violet-400",
  amber: "bg-amber-400",
};

const buttonMap: Record<Project["color"], string> = {
  violet: "bg-violet-500 hover:bg-violet-400 text-white",
  amber: "bg-amber-500 hover:bg-amber-400 text-black",
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

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { title, description, tags, color, image, github, live } = project;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard
        className={`group relative flex flex-col p-6 rounded-2xl border bg-linear-to-b ${accentMap[color]} bg-white/2 transition-colors duration-300`}
      >
        {/* Project screenshot */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/5 mb-6 bg-zinc-950">
          <Image
            src={image}
            alt={`Screenshot do projeto ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${dotMap[color]}`} />
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 text-xs rounded-full border ${tagMap[color]}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors ${buttonMap[color]}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M14 5h5v5M19 5L10 14M5 5h4M5 19h14v-4" />
              </svg>
              Acessar site
            </a>
          )}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.69-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55C20.22 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
            </svg>
            Ver código
          </a>
        </div>

        {/* Arrow icon on hover */}
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </TiltCard>
    </motion.div>
  );
}
