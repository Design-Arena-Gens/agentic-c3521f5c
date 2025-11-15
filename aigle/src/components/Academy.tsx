"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "../context/LanguageContext";
import clsx from "clsx";

const allLabelMap = {
  fr: "Toutes",
  en: "All",
  es: "Todas",
  ar: "الكل",
} as const;

export function Academy() {
  const { content, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("__all");

  const filters = useMemo(
    () => [{ label: allLabelMap[language], value: "__all" }, ...content.academy.filters.map((label) => ({ label, value: label }))],
    [content.academy.filters, language],
  );

  const filteredCourses = useMemo(() => {
    if (activeFilter === "__all") return content.academy.courses;
    return content.academy.courses.filter(
      (course) => course.category === activeFilter,
    );
  }, [activeFilter, content.academy.courses]);

  return (
    <section
      id="academy"
      className="relative mx-auto mt-32 max-w-6xl px-4 text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
          {content.academy.title}
        </span>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
          {content.academy.description}
        </h2>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={clsx(
              "rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-blue-100 transition",
              activeFilter === filter.value
                ? "bg-white/15 text-white shadow shadow-blue-500/25"
                : "hover:border-white/30 hover:text-white",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-yellow-300/10 opacity-0 transition hover:opacity-100" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blue-100/70">
                  {course.category}
                </span>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
                  {course.badge}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-white">
                {course.title}
              </h3>
              <p className="text-sm text-blue-100/85">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100/70">
                <span>{course.duration}</span>
                <span className="h-1 w-1 rounded-full bg-blue-200" />
                <span>{course.level}</span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-yellow-300">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    className={clsx(
                      "h-4 w-4",
                      starIndex < Math.round(course.rating)
                        ? "text-yellow-300"
                        : "text-blue-200/40",
                    )}
                  />
                ))}
                <span className="ml-2 text-xs text-blue-100/70">
                  {course.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
