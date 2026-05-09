"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    category: "Frontend",
    color: "violet",
    items: [
      { name: "React", level: 70 },
      { name: "Next.js", level: 65 },
      { name: "TypeScript", level: 60 },
      { name: "HTML & CSS", level: 85 },
    ],
  },
  {
    category: "Styling",
    color: "cyan",
    items: [
      { name: "Tailwind CSS", level: 75 },
      { name: "Framer Motion", level: 55 },
      { name: "CSS Animations", level: 70 },
      { name: "Responsive Design", level: 80 },
    ],
  },
  {
    category: "Design",
    color: "pink",
    items: [
      { name: "Figma", level: 65 },
      { name: "UI Design", level: 60 },
      { name: "Prototipagem", level: 55 },
      { name: "Design System", level: 50 },
    ],
  },
];

const colorMap: Record<string, string> = {
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
};

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

      <div className="flex flex-col gap-4">
        {items.map((skill) => (
          <div key={skill.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 text-sm font-medium">{skill.name}</span>
              <span className="text-zinc-600 text-xs font-mono">{skill.level}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: "easeOut" }}
                className={`h-full rounded-full ${colorMap[color]}`}
              />
            </div>
          </div>
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
