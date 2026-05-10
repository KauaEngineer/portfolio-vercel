"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    category: "Frontend",
    color: "violet",
    items: ["React", "Next.js", "TypeScript", "HTML & CSS"],
  },
  {
    category: "Styling",
    color: "cyan",
    items: ["Tailwind CSS", "Framer Motion", "CSS Animations", "Responsive Design"],
  },
  {
    category: "Design",
    color: "pink",
    items: ["Figma", "UI Design", "Prototipagem", "Design System"],
  },
];

const borderMap: Record<string, string> = {
  violet: "border-violet-500/30 hover:border-violet-500/60",
  cyan: "border-cyan-500/30 hover:border-cyan-500/60",
  pink: "border-pink-500/30 hover:border-pink-500/60",
};

const textMap: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  pink: "text-pink-400",
};

const glowMap: Record<string, string> = {
  violet: "bg-violet-600/10",
  cyan: "bg-cyan-600/10",
  pink: "bg-pink-600/10",
};

const tagMap: Record<string, string> = {
  violet: "bg-violet-500/10 border border-violet-500/30 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/60",
  cyan: "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/60",
  pink: "bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 hover:border-pink-500/60",
};

function SkillCard({ category, color, items, index }: (typeof skills)[number] & { index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className={`relative p-6 rounded-2xl border bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 ${borderMap[color]}`}
    >
      <div className={`absolute inset-0 rounded-2xl ${glowMap[color]} opacity-0 hover:opacity-100 transition-opacity duration-300`} />

      <h3 className={`text-sm font-mono tracking-widest uppercase mb-6 ${textMap[color]}`}>
        {category}
      </h3>

      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, delay: index * 0.15 + i * 0.07 + 0.2 }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-default ${tagMap[color]}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-violet-500/30" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-mono tracking-widest uppercase mb-4">
            Tecnologias
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Minhas <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <SkillCard key={s.category} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
