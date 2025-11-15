"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

function useAnimatedCounter(end: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, active]);

  return value;
}

type StatCardProps = {
  stat: {
    label: string;
    value: number;
    suffix: string;
    description: string;
  };
  index: number;
  active: boolean;
};

function StatCard({ stat, index, active }: StatCardProps) {
  const animatedValue = useAnimatedCounter(stat.value, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100/60">
          {stat.label}
        </p>
        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-yellow-300" />
      </div>
      <p className="text-5xl font-semibold text-white">
        {animatedValue}
        {stat.suffix}
      </p>
      <p className="text-sm text-blue-100/80">{stat.description}</p>
    </motion.div>
  );
}

export function Stats() {
  const { content } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.35 });

  return (
    <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4">
      <div
        ref={containerRef}
        className="glass-panel rounded-[2.5rem] border border-white/10 p-10 shadow-xl shadow-blue-500/10"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} active={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
