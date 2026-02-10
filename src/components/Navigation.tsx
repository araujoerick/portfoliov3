"use client";

import { useState } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/data/social-links-data";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="group fixed z-20 w-full pt-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="px-6 transition-all duration-300 bg-linear-to-b from-neutral-900/80 to-neutral-900/60 backdrop-blur-2xl border border-neutral-800/50 hover:border-neutral-700/50">
            <div className="relative flex flex-wrap items-center justify-between gap-4 py-2.5 duration-200 lg:gap-0 lg:py-3">
              {/* Logo */}
              <div className="flex items-center justify-between w-full lg:flex-1 lg:w-auto">
                <a
                  aria-label="home"
                  className="flex items-center space-x-2 transition-transform hover:scale-105"
                  href="#home"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Terminal
                      className="w-6 h-6 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span className="text-xl font-bold">
                      <span className="text-white">EA</span>
                      <span className="text-emerald-400">.</span>
                    </span>
                  </div>
                </a>

                {/* Mobile Menu Button */}
                <button
                  aria-label={isOpen ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <X className="size-6 text-white" aria-hidden="true" />
                  ) : (
                    <Menu className="size-6 text-white" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block lg:flex-1">
                <ul className="flex items-center justify-center gap-1">
                  <li>
                    <a
                      href="#home"
                      className="relative px-4 py-2 text-sm font-medium transition-all duration-200 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                    >
                      Início
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="relative px-4 py-2 text-sm font-medium transition-all duration-200 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                    >
                      Sobre
                    </a>
                  </li>
                  <li>
                    <a
                      href="#skills"
                      className="relative px-4 py-2 text-sm font-medium transition-all duration-200 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                    >
                      Habilidades
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      className="relative px-4 py-2 text-sm font-medium transition-all duration-200 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                    >
                      Projetos
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Desktop Social Links & CTA */}
              <div className="hidden lg:flex lg:flex-1 items-center justify-end gap-3">
                <div className="flex items-center gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="inline-flex items-center justify-center h-9 w-9 p-0 transition-all text-neutral-400 hover:bg-emerald-500/10 hover:text-emerald-500"
                    >
                      <link.Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="mailto:araujoerick.dev@gmail.com"
                  className="group/btn px-5 py-2.5 bg-emerald-500 text-white font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer flex items-center gap-2"
                >
                  <span>Vamos conversar</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>

              {/* Mobile Menu */}
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/50 lg:hidden">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#home"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-neutral-400 hover:text-emerald-400  hover:bg-emerald-500/5"
                      >
                        Início
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-neutral-400 hover:text-emerald-400  hover:bg-emerald-500/5"
                      >
                        Sobre
                      </a>
                    </li>
                    <li>
                      <a
                        href="#skills"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-neutral-400 hover:text-emerald-400  hover:bg-emerald-500/5"
                      >
                        Habilidades
                      </a>
                    </li>
                    <li>
                      <a
                        href="#projects"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-neutral-400 hover:text-emerald-400  hover:bg-emerald-500/5"
                      >
                        Projetos
                      </a>
                    </li>
                  </ul>

                  <div className="mt-4 pt-4 border-t border-neutral-800">
                    <a
                      href="mailto:araujoerick.dev@gmail.com"
                      className="w-full px-5 py-2.5 bg-emerald-500 text-white font-medium flex items-center justify-center gap-2"
                    >
                      <span>Vamos conversar</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
