"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBagIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext";
import type { LanguageCode } from "../context/LanguageContext";
import clsx from "clsx";

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "ar", label: "AR" },
] as const;

export function Header() {
  const { content, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full justify-center px-4">
      <motion.nav
        animate={{ paddingTop: scrolled ? 12 : 20 }}
        initial={{ paddingTop: 20 }}
        className={clsx(
          "glass-panel glow-ring relative mt-6 flex w-full max-w-6xl items-center gap-6 rounded-3xl px-8 py-4 transition-all duration-500",
          scrolled ? "backdrop-blur-2xl" : "backdrop-blur-lg",
        )}
      >
        <div className="flex flex-1 items-center gap-4">
          <motion.div
            whileHover={{ rotate: -4, scale: 1.03 }}
            className="relative flex items-center gap-3"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-semibold text-white shadow-lg shadow-blue-500/30">
              AJ
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium uppercase tracking-[0.4em] text-blue-100">
                Aigle
              </span>
              <span className="text-lg font-semibold text-white">
                Jurassien
              </span>
            </div>
          </motion.div>
          <div className="hidden items-center gap-2 lg:flex">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-blue-100 transition hover:text-white"
              >
                <motion.span whileHover={{ y: -2 }} className="relative z-10">
                  {item.label}
                </motion.span>
                <motion.span
                  className="absolute inset-0 rounded-full bg-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 py-1 pl-2 pr-1 text-xs uppercase tracking-[0.2em] text-blue-100 md:flex">
            <GlobeAltIcon className="h-4 w-4" />
            {languages.map((option) => (
              <button
                key={option.code}
                onClick={() => setLanguage(option.code)}
                className={clsx(
                  "rounded-full px-3 py-1 font-semibold transition",
                  option.code === language
                    ? "bg-blue-500 text-white shadow shadow-blue-500/30"
                    : "text-blue-100 hover:bg-white/10",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            className="flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-100 focus:border-white/40 focus:outline-none md:hidden"
          >
            {languages.map((option) => (
              <option key={option.code} value={option.code} className="bg-slate-900 text-white">
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            className="relative flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <span className="hidden md:inline">{content.cart.title}</span>
            <motion.span
              animate={{
                scale: cartOpen ? 1.15 : 1,
                y: cartOpen ? -2 : 0,
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white shadow shadow-blue-500/40"
            >
              0
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {cartOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="absolute right-6 top-24 w-80 overflow-hidden rounded-3xl border border-white/10 bg-surface-strong p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
                  <ShoppingBagIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {content.cart.title}
                  </h3>
                  <p className="text-sm text-blue-100/80">
                    {content.cart.empty}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 w-full rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-600"
              >
                {content.cart.cta}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
