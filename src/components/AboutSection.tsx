"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Monitor,
  Server,
  Database,
  Cloud,
  Link2,
  Palette,
} from "lucide-react";
import { experiences, skills } from "@/data/about-data";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<"story" | "skills">("story");

  return (
    <section
      id="about"
      className="relative bg-black py-16 sm:py-20 overflow-hidden"
    >
      <div id="skills" className="absolute -top-20" />

      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent flex-1" />
            <span className="text-xs text-neutral-400 uppercase tracking-widest font-medium">
              Sobre
            </span>
            <div className="h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent flex-1" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-center">
            <span className="text-white">Construindo o </span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-linear-to-r from-emerald-400 via-green-400 to-teal-400 blur-2xl opacity-50" />
              <span className="relative bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
                futuro
              </span>
            </span>
            <br />
            <span className="text-white">uma linha de cada vez</span>
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12 px-4 sm:px-0">
          <div className="flex w-full max-w-xs sm:w-auto sm:max-w-none sm:inline-flex p-1.5 bg-linear-to-b from-neutral-900/80 to-neutral-900 border border-neutral-800/50 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab("story")}
              className={`flex-1 sm:flex-none px-6 py-3 sm:py-2.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "story"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              História
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex-1 sm:flex-none px-6 py-3 sm:py-2.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "skills"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Habilidades
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative transition-all duration-700 overflow-hidden">
          {activeTab === "story" && (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Story Text */}
              <div className="space-y-6">
                <div className="bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 border border-neutral-800/60 backdrop-blur-xl p-8">
                  <p className="text-xl text-neutral-300 font-light leading-relaxed mb-6">
                    Sou graduado em{" "}
                    <span className="text-white font-medium">
                      Sistemas de Informação
                    </span>{" "}
                    e pós-graduado em{" "}
                    <span className="text-white font-medium">
                      Desenvolvimento Full Stack
                    </span>
                    . Atualmente atuo como freelance e tenho vivência na
                    construção de aplicações escaláveis.
                  </p>
                  <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                    Recentemente, colaborei no desenvolvimento de plataformas de{" "}
                    <span className="text-white font-medium">
                      Swap e Dashboards de Criptoativos
                    </span>
                    , onde o desafio era integrar dados complexos de blockchain
                    com interfaces de alta fidelidade. Para isso usei Next.js,
                    TypeScript, React Query, Wagmi e Ethers.js.
                  </p>
                  <p className="text-lg text-neutral-400 leading-relaxed">
                    Meu objetivo é evoluir tecnicamente em um ambiente
                    colaborativo. Trago comigo a experiência de resolver
                    problemas de forma autônoma como freelancer e uma base
                    sólida em tecnologias atuais.
                  </p>
                  <div className="mt-8 pt-6 border-t border-neutral-800/50">
                    <a
                      href="/docs/ErickAraujoCV.pdf"
                      download="ErickAraujoCV.pdf"
                      className="group inline-flex items-center gap-2 text-emerald-400 cursor-pointer font-medium hover:gap-3 transition-all"
                    >
                      <span>Baixar currículo completo</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-0 w-px bg-linear-to-b from-emerald-500/60 via-teal-500/40 to-emerald-500/20 z-0" />

                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="group relative z-10  bg-black border border-neutral-800/60 hover:border-neutral-700/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0  bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 pointer-events-none" />

                    {/* Timeline Dot */}
                    {index > 0 && (
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20">
                        <div className="w-3 h-3 bg-emerald-500 ring-4 ring-black group-hover:ring-emerald-500/20 transition-all duration-300" />
                      </div>
                    )}

                    <div className="relative z-10 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs text-neutral-400 font-medium">
                              {exp.period}
                            </span>
                            <div className="w-1 h-1  bg-neutral-600" />
                            <span className="text-sm text-neutral-400">
                              {exp.role}
                            </span>
                          </div>
                          <h3 className="text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:bg-clip-text transition-all">
                            {exp.company}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-400 mb-3">
                        {exp.description}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div
                            key={achIndex}
                            className="group/card relative p-3 border border-neutral-700/40 bg-neutral-800/30 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                          >
                            <span className="text-xs text-neutral-400 leading-relaxed group-hover/card:text-neutral-300 transition-colors">
                              {achievement.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
              {Object.entries(skills).map(([category, skillList]) => {
                const colorMap: Record<
                  string,
                  {
                    bg: string;
                    text: string;
                    border: string;
                    hover: string;
                    icon: React.ReactNode;
                  }
                > = {
                  Frontend: {
                    bg: "bg-emerald-500/10",
                    text: "text-emerald-400",
                    border: "border-emerald-500/20",
                    hover:
                      "hover:border-emerald-500/50 hover:bg-emerald-500/20",
                    icon: <Monitor className="w-5 h-5" />,
                  },
                  Backend: {
                    bg: "bg-cyan-500/10",
                    text: "text-cyan-400",
                    border: "border-cyan-500/20",
                    hover: "hover:border-cyan-500/50 hover:bg-cyan-500/20",
                    icon: <Server className="w-5 h-5" />,
                  },
                  "Banco de Dados": {
                    bg: "bg-purple-500/10",
                    text: "text-purple-400",
                    border: "border-purple-500/20",
                    hover: "hover:border-purple-500/50 hover:bg-purple-500/20",
                    icon: <Database className="w-5 h-5" />,
                  },
                  "DevOps & Cloud": {
                    bg: "bg-orange-500/10",
                    text: "text-orange-400",
                    border: "border-orange-500/20",
                    hover: "hover:border-orange-500/50 hover:bg-orange-500/20",
                    icon: <Cloud className="w-5 h-5" />,
                  },
                  "Web3 & Blockchain": {
                    bg: "bg-blue-500/10",
                    text: "text-blue-400",
                    border: "border-blue-500/20",
                    hover: "hover:border-blue-500/50 hover:bg-blue-500/20",
                    icon: <Link2 className="w-5 h-5" />,
                  },
                  "Testes & Design": {
                    bg: "bg-lime-500/10",
                    text: "text-lime-400",
                    border: "border-lime-500/20",
                    hover: "hover:border-lime-500/50 hover:bg-lime-500/20",
                    icon: <Palette className="w-5 h-5" />,
                  },
                };

                const colors = colorMap[category] || {
                  bg: "bg-neutral-500/10",
                  text: "text-neutral-400",
                  border: "border-neutral-500/20",
                  hover: "hover:border-neutral-500/50 hover:bg-neutral-500/20",
                  icon: <Monitor className="w-5 h-5" />,
                };

                return (
                  <div
                    key={category}
                    className="group/card bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 border border-neutral-800/60 backdrop-blur-xl p-6 hover:border-neutral-700/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`${colors.text} transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6`}
                      >
                        {colors.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover/card:text-transparent group-hover/card:bg-linear-to-r group-hover/card:from-emerald-400 group-hover/card:to-teal-400 group-hover/card:bg-clip-text transition-all">
                        {category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 text-sm ${colors.bg} ${colors.text} border ${colors.border} ${colors.hover} transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-default`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
