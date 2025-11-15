"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export function Services() {
  const { content } = useLanguage();

  return (
    <section
      id="services"
      className="relative mx-auto mt-32 max-w-6xl px-4 text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
          {content.services.title}
        </span>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
          {content.services.description}
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {content.services.items.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-slate-900/60 to-slate-950/70 p-10"
          >
            <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.3em] text-blue-100/70">
                  {service.tagline}
                </span>
                <span className="text-lg font-semibold text-blue-200">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-3xl font-semibold">{service.title}</h3>
              <p className="text-sm text-blue-100/85">{service.description}</p>
              <ul className="space-y-3 text-sm text-blue-100/80">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-yellow-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
