import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import CodeTerminal from "./CodeTerminal";

const TechIcon = ({ name, src }: { name: string; src: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative flex h-10 w-10 items-center justify-center">
      <Image src={src} alt={name} fill className="object-contain" />
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
        <div className="absolute top-20 -left-20 h-72 w-72 animate-pulse rounded-full bg-emerald-500/20 blur-3xl filter md:h-96 md:w-96" />
        <div className="absolute top-40 -right-20 h-72 w-72 animate-pulse rounded-full bg-lime-500/20 blur-3xl filter [animation-delay:2s] md:h-96 md:w-96" />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 md:py-12 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:gap-12 lg:grid lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6 text-center md:space-y-8 lg:text-left">
            <div>
              <h1 className="mb-6 font-(family-name:--font-instrument-sans) text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                <span className="font-semibold text-emerald-500">
                  Erick Araujo
                </span>{" "}
                Desenvolvedor Full Stack
              </h1>
              <p className="mb-2 text-xl text-neutral-400 sm:text-2xl">
                Construindo aplicações modernas com{" "}
                <span className="font-semibold">TypeScript</span>,{" "}
                <span className="font-semibold">React</span>,{" "}
                <span className="font-semibold">Next.js</span>,{" "}
                <span className="font-semibold">Node</span> e{" "}
                <span className="font-semibold">NestJS</span> sempre visando
                performance e pixel perfect.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 min-[360px]:flex-row lg:justify-start">
              <a
                href="#projects"
                className="group w-full cursor-pointer bg-emerald-500 px-4 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg min-[360px]:w-auto min-[360px]:px-6"
              >
                <span className="flex items-center justify-center gap-2">
                  Ver Projetos
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <a
                href="/docs/ErickAraujoCV.pdf"
                download="ErickAraujoCV.pdf"
                className="group w-full cursor-pointer border border-neutral-800/50 bg-linear-to-b from-neutral-900/80 to-neutral-900 px-4 py-3 font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-neutral-700 min-[360px]:w-auto min-[360px]:px-6"
              >
                <span className="flex items-center justify-center gap-2 text-neutral-300">
                  Baixar CV
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </span>
              </a>
            </div>

            {/* Tech Icons */}
            <div className="mt-12 flex items-center justify-center gap-5 lg:justify-start">
              <TechIcon name="Next.js" src="/tech-icons/nextjs-icon.svg" />
              <TechIcon name="React" src="/tech-icons/react.svg" />
              <TechIcon
                name="TypeScript"
                src="/tech-icons/typescript-icon.svg"
              />
              <TechIcon name="Node.js" src="/tech-icons/nodejs-icon.svg" />
              <TechIcon name="NestJS" src="/tech-icons/nestjs.svg" />
            </div>
          </div>

          {/* Right Content - Code Preview */}
          <CodeTerminal />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex">
        <a href="#about" className="group cursor-pointer">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-neutral-500/60 pt-2 transition-colors duration-300 group-hover:border-emerald-500/80">
            <div className="h-2 w-1 animate-bounce rounded-full bg-emerald-500" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
