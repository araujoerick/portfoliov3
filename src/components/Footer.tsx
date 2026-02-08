"use client";

import { Terminal, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/data/social-links-data";

const Footer = () => {
  return (
    <footer id="footer" className="relative bg-black overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-teal-500/20 rounded-full filter blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
        {/* Top Border */}
        <div className="absolute top-0 left-6 right-6 lg:left-12 lg:right-12 h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-6 space-y-4 md:space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center gap-2 cursor-pointer">
                <Terminal className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold">
                  <span className="text-white">EA</span>
                  <span className="text-emerald-400">.</span>
                </span>
              </div>
            </div>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-md mx-auto md:mx-0">
              Desenvolvedor Full Stack especializado em aplicações modernas e
              escaláveis. Construindo interfaces Pixel Perfect com foco em
              performance e experiência do usuário.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-4 text-center md:text-left">
            <h3 className="text-white font-medium text-sm md:text-base">
              Links Rápidos
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-neutral-500 hover:text-emerald-400 transition-colors text-sm"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-neutral-500 hover:text-emerald-400 transition-colors text-sm"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-neutral-500 hover:text-emerald-400 transition-colors text-sm"
                >
                  Habilidades
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-neutral-500 hover:text-emerald-400 transition-colors text-sm"
                >
                  Projetos
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-4 text-center md:text-left">
            <h3 className="text-white font-medium text-sm md:text-base">
              Conecte-se
            </h3>

            {/* Mobile Social Icons */}
            <div className="flex md:hidden justify-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-linear-to-b from-neutral-900/80 to-neutral-900 border border-neutral-800/50 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
                >
                  <link.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Desktop Social Links with Labels */}
            <div className="hidden md:block space-y-3">
              {socialLinks.map((link) => {
                const displayLabel =
                  link.label === "Email"
                    ? "araujoerick.dev@gmail.com"
                    : link.label === "LinkedIn"
                      ? "/in/araujoerick09"
                      : "araujoerick";

                return (
                  <a
                    key={link.label}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-linear-to-b from-neutral-900/80 to-neutral-900 border border-neutral-800/50 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-400 transition-all">
                      <link.Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-neutral-500 group-hover:text-emerald-400 transition-colors">
                      {displayLabel}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 md:mt-12 pt-6 border-t border-neutral-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-6 text-center md:text-left">
              <span className="text-xs md:text-sm text-neutral-500">
                &copy; 2026 Erick Araujo
              </span>
              <span className="hidden md:block text-neutral-700">&bull;</span>
              <span className="text-xs md:text-sm text-neutral-500">
                Desenvolvedor Full Stack @ Aditiva Soluções
              </span>
            </div>
            <a
              href="#home"
              className="group flex items-center gap-2 text-xs md:text-sm text-neutral-500 hover:text-emerald-400 cursor-pointer transition-all"
            >
              Voltar ao topo
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 -rotate-45 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
    </footer>
  );
};

export default Footer;
