"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { content } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative mt-32 border-t border-white/10 bg-slate-950/50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-white/10 p-10 text-white"
          >
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/30 to-yellow-300/20 blur-3xl" />
            <h3 className="text-lg font-semibold uppercase tracking-[0.4em] text-blue-100/80">
              {content.footer.newsletter.title}
            </h3>
            <p className="mt-4 max-w-md text-sm text-blue-100/80">
              {content.footer.newsletter.description}
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setSubscribed(false);
                  setEmail(event.target.value);
                }}
                className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-blue-100/50 focus:border-blue-400 focus:outline-none"
                placeholder={content.footer.newsletter.placeholder}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow shadow-blue-500/20"
              >
                {content.footer.newsletter.cta}
              </motion.button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-xs text-blue-100/80"
              >
                {content.footer.newsletter.success}
              </motion.p>
            )}
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2">
            {content.footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3 text-sm text-blue-100/80">
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-blue-100/70 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow shadow-blue-500/30">
              AJ
            </span>
            <span>{content.footer.bottom}</span>
          </div>
          <div className="flex gap-4">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="text-blue-100/60">Precision-led transformation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
