"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRightIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { ParticleCanvas } from "./ParticleCanvas";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { content } = useLanguage();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 12 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 12 });

  const metrics = useMemo(
    () => [
      { title: "Augmented Ops", value: "∞" },
      { title: "ISO Suites", value: "7" },
      { title: "CX Moments", value: "21" },
    ],
    [],
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    rotateX.set(percentY * -10);
    rotateY.set(percentX * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-48">
      <div className="absolute inset-0">
        <div className="blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-blue-100">
            {content.hero.subtitle}
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-blue-100/90">
            {content.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href="#audit"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              {content.hero.primaryCta}
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/10"
            >
              <PlayCircleIcon className="h-5 w-5" />
              {content.hero.secondaryCta}
            </motion.a>
          </div>
          <div className="mt-10 grid gap-3 text-sm text-blue-100/80 sm:grid-cols-3">
            {content.hero.highlights.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-yellow-300 shadow shadow-blue-500/40" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative flex flex-1 items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: 1200,
          }}
        >
          <motion.div
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative h-[420px] w-full max-w-[420px]"
          >
            <div className="noise pointer-events-none" />
            <ParticleCanvas />
            <motion.div
              className="absolute inset-[0.75rem] rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/30 to-blue-950/60 p-8 shadow-2xl"
              style={{
                transform: useMotionTemplate`translateZ(60px)`,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-blue-100/70">
                    Signature
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-white">
                    AJ<span className="text-blue-400">∞</span>
                  </p>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-xs text-blue-100/80">
                  Precision Engineered
                </div>
              </div>
              <div className="mt-12 space-y-6">
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.title}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-blue-100/90"
                  >
                    <span className="text-sm uppercase tracking-[0.2em]">
                      {metric.title}
                    </span>
                    <span className="text-2xl font-semibold text-white">
                      {metric.value}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 flex items-center gap-3 text-xs text-blue-100/70">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Live telemetry feed secured
              </div>
            </motion.div>
            <motion.div
              className="absolute -left-16 top-1/3 hidden h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/50 to-yellow-300/30 blur-2xl md:block"
              style={{ transform: useMotionTemplate`translateZ(20px)` }}
            />
            <motion.div
              className="absolute -right-12 bottom-8 hidden h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/40 to-transparent blur-3xl md:block"
              style={{ transform: useMotionTemplate`translateZ(30px)` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
