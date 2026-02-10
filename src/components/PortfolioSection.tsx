"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { projectsData } from "@/data/projects-data";
import Image from "next/image";

const PortfolioSection = () => {
  return (
    <section
      id="projects"
      className="relative bg-black py-16 sm:py-20 overflow-hidden"
    >
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-500/20 rounded-full filter blur-3xl animate-pulse [animation-delay:4s]" />
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
              Projetos
            </span>
            <div className="h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent flex-1" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-center">
            <span className="text-white">Projetos em </span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-linear-to-r from-emerald-400 via-green-400 to-teal-400 blur-2xl opacity-50" />
              <span className="relative bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
                destaque
              </span>
            </span>
          </h2>
          <p className="text-center text-neutral-400 mt-6 max-w-2xl mx-auto text-lg">
            Plataformas modernas com foco em performance, pixel perfect e
            experiência do usuário
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <div key={index} className="group relative cursor-pointer">
              <div className="relative overflow-hidden bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 border border-neutral-800/60 backdrop-blur-xl hover:border-neutral-700/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:bg-clip-text transition-all mb-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-sm mb-4 min-h-18 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techs.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 text-xs bg-neutral-800/50 text-neutral-400 border border-neutral-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techs.length > 3 && (
                      <span className="px-2.5 py-1 text-xs bg-emerald-900/20 text-emerald-400 border border-emerald-700/50">
                        +{project.techs.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/50">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>Código</span>
                      </a>
                    )}
                    {project.deployUrl && project.deployUrl !== "#" && (
                      <a
                        href={project.deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-all text-sm"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-teal-500 blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <a
            href="mailto:araujoerick.dev@gmail.com"
            className="group relative px-8 py-4 bg-emerald-500 text-white font-medium transition-all hover:scale-105 hover:shadow-lg overflow-hidden cursor-pointer hover:border-b-white border-b-2 border-transparent"
          >
            <span className="relative z-10 flex items-center gap-2">
              Vamos conversar
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
