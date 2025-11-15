import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Sectors } from "../components/Sectors";
import { Services } from "../components/Services";
import { Academy } from "../components/Academy";
import { Shop } from "../components/Shop";
import { Audit } from "../components/Audit";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10 opacity-60 blur-3xl">
        <div className="absolute left-20 top-20 h-56 w-56 rounded-full bg-blue-500/20" />
        <div className="absolute right-10 top-64 h-72 w-72 rounded-full bg-yellow-300/20" />
        <div className="absolute bottom-0 left-[40%] h-96 w-96 rounded-full bg-blue-900/50" />
      </div>
      <Header />
      <main className="relative flex flex-1 flex-col gap-20 pb-32">
        <Hero />
        <Stats />
        <Sectors />
        <Services />
        <Academy />
        <Shop />
        <Audit />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
