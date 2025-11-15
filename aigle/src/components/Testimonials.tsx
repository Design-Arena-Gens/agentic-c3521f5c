"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.95,
  }),
};

const navLabels = {
  fr: { prev: "Précédent", next: "Suivant" },
  en: { prev: "Prev", next: "Next" },
  es: { prev: "Anterior", next: "Siguiente" },
  ar: { prev: "السابق", next: "التالي" },
} as const;

export function Testimonials() {
  const { content, language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % content.testimonials.items.length);
  };

  const previous = () => {
    setDirection(-1);
    setIndex((prev) =>
      prev === 0 ? content.testimonials.items.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      next();
    }, 6000);
    return () => window.clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeItem = content.testimonials.items[index];

  return (
    <section
      id="testimonials"
      className="relative mx-auto mt-32 max-w-6xl px-4 text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
          {content.testimonials.title}
        </span>
      </div>
      <div className="relative mt-12 overflow-hidden">
        <div className="glass-panel rounded-[2.5rem] border border-white/10 p-12">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeItem.quote}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 120, damping: 18 },
                opacity: { duration: 0.25 },
              }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <p className="text-lg leading-relaxed text-blue-100/90">
                “{activeItem.quote}”
              </p>
              <div className="flex flex-col items-center gap-1 text-sm">
                <span className="font-semibold text-white">
                  {activeItem.author}
                </span>
                <span className="text-blue-100/70">{activeItem.role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={previous}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-blue-100 transition hover:border-white/30 hover:text-white"
            >
              <ArrowLongLeftIcon className="h-5 w-5" />
              {navLabels[language].prev}
            </button>
            <div className="flex gap-2">
              {content.testimonials.items.map((item, itemIndex) => (
                <button
                  key={item.quote}
                  onClick={() => {
                    setDirection(itemIndex > index ? 1 : -1);
                    setIndex(itemIndex);
                  }}
                  className="relative h-2 w-10 overflow-hidden rounded-full bg-white/10"
                >
                  {itemIndex === index && (
                    <motion.span
                      layoutId="testimonial-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-300"
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-blue-100 transition hover:border-white/30 hover:text-white"
            >
              {navLabels[language].next}
              <ArrowLongRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
