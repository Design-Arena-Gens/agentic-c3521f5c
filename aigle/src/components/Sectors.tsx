"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export function Sectors() {
  const { content } = useLanguage();

  return (
    <section
      id="sectors"
      className="relative mx-auto mt-28 max-w-6xl px-4 text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
          {content.sectors.title}
        </span>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
          {content.sectors.description}
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {content.sectors.items.map((sector, index) => (
          <motion.div
            key={sector.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-lg shadow-blue-500/10 transition-transform"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-yellow-300/10 opacity-0 transition group-hover:opacity-100" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100/70">
                  0{index + 1}
                </p>
                <motion.span
                  className="h-12 w-12 rounded-2xl bg-blue-500/15"
                  whileHover={{ rotate: 12 }}
                />
              </div>
              <h3 className="text-2xl font-semibold text-white">
                {sector.title}
              </h3>
              <p className="text-sm leading-relaxed text-blue-100/85">
                {sector.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
