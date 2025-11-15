"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  standard: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  standard: "",
  message: "",
};

export function Audit() {
  const { content } = useLanguage();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setSubmitted(false);
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="audit"
      className="relative mx-auto mt-32 max-w-6xl px-4 text-white"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-slate-900/60 to-blue-950/60 p-10 shadow-xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
            {content.audit.title}
          </span>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            {content.audit.description}
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-blue-100/80">
            {content.audit.standards.map((standard) => (
              <li
                key={standard}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-yellow-300" />
                <span>{standard}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur"
        >
          <div>
            <h3 className="text-xl font-semibold text-white">
              {content.audit.form.title}
            </h3>
            <p className="mt-2 text-sm text-blue-100/80">
              {content.audit.form.description}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-blue-100/70">
              {content.audit.form.fields.name}
              <input
                required
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className="rounded-2xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-blue-400 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-blue-100/70">
              {content.audit.form.fields.company}
              <input
                required
                type="text"
                value={form.company}
                onChange={handleChange("company")}
                className="rounded-2xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-blue-400 focus:outline-none"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-blue-100/70">
              {content.audit.form.fields.email}
              <input
                required
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="rounded-2xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-blue-400 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-blue-100/70">
              {content.audit.form.fields.phone}
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                className="rounded-2xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-blue-400 focus:outline-none"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-blue-100/70">
            {content.audit.form.fields.standard}
            <select
              required
              value={form.standard}
              onChange={handleChange("standard")}
              className="rounded-2xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="" disabled>
                {content.audit.form.placeholder}
              </option>
              {content.audit.standards.map((standard) => (
                <option key={standard} value={standard} className="bg-slate-900 text-white">
                  {standard}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-blue-100/70">
            {content.audit.form.fields.message}
            <textarea
              value={form.message}
              onChange={handleChange("message")}
              rows={4}
              className="rounded-2xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white focus:border-blue-400 focus:outline-none"
            />
          </label>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-4 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow shadow-blue-500/20"
          >
            {content.audit.form.submit}
          </motion.button>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs text-blue-100/80"
            >
              {content.audit.form.success}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
