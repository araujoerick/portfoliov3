"use client";

import { ArrowUpRight, Download, Terminal } from "lucide-react";

const TechIcon = ({ name, color }: { name: string; color: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
    >
      <span className="text-white text-xs font-bold">
        {name.slice(0, 2).toUpperCase()}
      </span>
    </div>
    <span className="text-sm text-neutral-400">{name}</span>
  </div>
);

const HeroSection = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen overflow-hidden bg-black pt-24 md:pt-32"
    >
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-20 w-72 h-72 md:w-96 md:h-96 bg-lime-500/20 rounded-full filter blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8 md:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                Construindo aplicações modernas com performance e pixel perfect.
              </h1>
              <p className="text-xl sm:text-2xl text-neutral-400 mb-2">
                Eu sou{" "}
                <span className="text-emerald-500 font-semibold">
                  Erick Araujo
                </span>
                , Desenvolvedor Full Stack na{" "}
                <span className="text-lime-500 font-semibold">
                  Aditiva Soluções
                </span>
              </p>
              <p className="text-lg text-neutral-500 mt-4">
                Especializado em <span className="font-semibold">React</span>,{" "}
                <span className="font-semibold">Next.js</span> e{" "}
                <span className="font-semibold">NestJS</span> com foco em
                aplicações <span className="font-semibold">Web3</span> e{" "}
                <span className="font-semibold">microserviços</span>.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col min-[360px]:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#projects"
                className="group w-full min-[360px]:w-auto px-4 min-[360px]:px-6 py-3 bg-emerald-500 text-white font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  Ver Projetos
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <a
                href="/docs/ErickAraujoCV.pdf"
                download="ErickAraujoCV.pdf"
                className="group w-full min-[360px]:w-auto px-4 min-[360px]:px-6 py-3 rounded-full font-medium bg-linear-to-b from-neutral-900/80 to-neutral-900 border border-neutral-800/50 hover:border-neutral-700 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2 text-neutral-300">
                  Baixar CV
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </span>
              </a>
            </div>

            {/* Tech Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12">
              <TechIcon name="React" color="bg-cyan-500" />
              <TechIcon name="Next.js" color="bg-neutral-700" />
              <TechIcon name="TypeScript" color="bg-blue-600" />
              <TechIcon name="NestJS" color="bg-red-500" />
              <TechIcon name="PostgreSQL" color="bg-indigo-600" />
            </div>
          </div>

          {/* Right Content - Code Preview */}
          <div className="w-full">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 border border-neutral-800/60 backdrop-blur-xl p-4 sm:p-6 hover:border-neutral-700/50 transition-all duration-500">
                {/* Window Controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-neutral-400 ml-2">
                      techstack.ts
                    </span>
                  </div>
                  <Terminal className="w-4 h-4 text-neutral-400" />
                </div>

                {/* Code Content */}
                <div className="bg-neutral-900/95 rounded-lg p-3 sm:p-4 h-75 sm:h-87.5 lg:h-100 overflow-y-auto scrollbar-hide">
                  <pre className="text-xs font-mono">
                    <code
                      style={{
                        color: "rgb(248, 248, 242)",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      <span style={{ color: "#6272a4" }}>
                        {"// Construindo aplicações modernas"}
                      </span>
                      {"\n"}
                      <span style={{ color: "#ff79c6" }}>
                        class
                      </span> TechStack {"{"}
                      {"\n"}
                      {"  "}
                      <span style={{ color: "#ff79c6" }}>
                        constructor
                      </span>() {"{"}
                      {"\n"}
                      {"    "}
                      <span style={{ color: "#ff79c6" }}>this</span>.
                      <span style={{ color: "#8be9fd" }}>frontend</span> ={" "}
                      <span style={{ color: "#bd93f9" }}>
                        [
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;React&apos;
                        </span>
                        ,{" "}
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;Next.js&apos;
                        </span>
                        ,{" "}
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;TypeScript&apos;
                        </span>
                        ,{" "}
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;Tailwind&apos;
                        </span>
                        ]
                      </span>
                      ;{"\n"}
                      {"    "}
                      <span style={{ color: "#ff79c6" }}>this</span>.
                      <span style={{ color: "#8be9fd" }}>backend</span> ={" "}
                      <span style={{ color: "#bd93f9" }}>
                        [
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;NestJS&apos;
                        </span>
                        ,{" "}
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;Node.js&apos;
                        </span>
                        ,{" "}
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;RabbitMQ&apos;
                        </span>
                        ,{" "}
                        <span style={{ color: "#f1fa8c" }}>
                          &apos;PostgreSQL&apos;
                        </span>
                        ]
                      </span>
                      ;{"\n"}
                      {"    "}
                      <span style={{ color: "#ff79c6" }}>this</span>.
                      <span style={{ color: "#8be9fd" }}>web3</span> = [&apos;
                      <span
                        style={{ color: "#ff79c6" }}
                        className="animate-pulse"
                      >
                        |
                      </span>
                    </code>
                  </pre>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                  <span>TypeScript</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="hidden sm:inline">
                      Full Stack Developer
                    </span>
                    <span className="sm:hidden">Dev Full Stack</span>
                  </span>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex">
        <a href="#about" className="group cursor-pointer">
          <div className="w-6 h-10 rounded-full border-2 border-neutral-500/60 group-hover:border-emerald-500/80 transition-colors duration-300 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-emerald-500 animate-bounce" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
