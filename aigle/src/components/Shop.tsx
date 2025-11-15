"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useLanguage } from "../context/LanguageContext";

const allLabelMap = {
  fr: "Toutes",
  en: "All",
  es: "Todas",
  ar: "الكل",
} as const;

const searchPlaceholderMap = {
  fr: "Rechercher une solution",
  en: "Search solutions",
  es: "Buscar soluciones",
  ar: "ابحث عن حل",
} as const;

const addToCartMap = {
  fr: "Ajouter au panier",
  en: "Add to cart",
  es: "Añadir al carrito",
  ar: "أضف للسلة",
} as const;

const emptyStateMap = {
  fr: "Aucun résultat ne correspond à votre recherche.",
  en: "No items match your filters.",
  es: "Ningún elemento coincide con tus filtros.",
  ar: "لا توجد عناصر مطابقة.",
} as const;

const maxLabelMap = {
  fr: "Max",
  en: "Max",
  es: "Máx",
  ar: "الحد",
} as const;

export function Shop() {
  const { content, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("__all");
  const [maxPrice, setMaxPrice] = useState(2000);

  const categories = useMemo(
    () => [
      { value: "__all", label: allLabelMap[language] },
      ...content.shop.categories.map((category) => ({ value: category, label: category })),
    ],
    [content.shop.categories, language],
  );

  const products = useMemo(() => {
    return content.shop.products.filter((product) => {
      const matchesCategory =
        activeCategory === "__all" || product.category === activeCategory;
      const matchesSearch =
        search.trim().length === 0 ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [activeCategory, content.shop.products, maxPrice, search]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <section
      id="shop"
      className="relative mx-auto mt-32 max-w-6xl px-4 text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
          {content.shop.title}
        </span>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
          {content.shop.description}
        </h2>
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-blue-100/80 focus-within:border-white/40">
            <MagnifyingGlassIcon className="h-5 w-5 text-blue-100/70" />
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              className="w-full bg-transparent text-white placeholder:text-blue-100/50 focus:outline-none"
              placeholder={searchPlaceholderMap[language]}
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-blue-100/80">
            <FunnelIcon className="h-5 w-5" />
            <span className="uppercase tracking-[0.3em]">
              {maxLabelMap[language]} {maxPrice} CHF
            </span>
            <input
              type="range"
              min={800}
              max={2100}
              step={100}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="h-1 w-40 cursor-pointer appearance-none rounded-full bg-blue-500/40 accent-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={clsx(
                "rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100 transition",
                category.value === activeCategory
                  ? "bg-blue-500/20 text-white shadow shadow-blue-500/20"
                  : "hover:border-white/30 hover:text-white",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {products.map((product, index) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="relative flex flex-col gap-4 overflow-hidden rounded-[2.1rem] border border-white/10 bg-white/5 p-8"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-yellow-300 to-blue-500 opacity-40" />
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blue-100/70">
                {product.category}
              </span>
              <span className="text-lg font-semibold text-yellow-300">
                CHF {product.price}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {product.title}
            </h3>
            <p className="text-sm text-blue-100/80">{product.description}</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 self-start rounded-full bg-gradient-to-r from-blue-500 to-sky-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow shadow-blue-500/20"
            >
              {addToCartMap[language]}
            </motion.button>
          </motion.div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-white/20 p-12 text-center text-sm text-blue-100/70">
            {emptyStateMap[language]}
          </div>
        )}
      </div>
    </section>
  );
}
