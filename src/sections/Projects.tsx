import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Container } from "../components/Container";
import { ProjectModal } from "../components/ProjectModal";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { projects, type Project } from "../data/projects";

const statusStyles: Record<Project["status"], string> = {
  Live: "text-accent border-accent/40",
  "In Progress": "text-fg-muted border-border-strong",
  Internal: "text-fg-subtle border-border",
};

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 md:py-36" aria-label="Featured projects">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Featured Projects"
          title="Case studies, not a list of technologies."
          description="Each one follows the same arc: a real business problem, the data behind it, and what changed as a result."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05} className={project.featured ? "md:col-span-2" : undefined}>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="group w-full text-left h-full rounded-2xl border border-border bg-bg-card p-8 md:p-10 transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle">{project.category}</p>
                    <h3 className="mt-2 font-display text-2xl md:text-3xl text-fg text-balance">{project.title}</h3>
                  </div>
                  <ArrowUpRight
                    className="h-6 w-6 shrink-0 text-fg-subtle transition-all duration-300 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-5 text-fg-muted leading-relaxed text-[15px] text-balance">{project.problem}</p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className={`text-xs rounded-full border px-3 py-1 ${statusStyles[project.status]}`}>
                    {project.status}
                  </span>
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs rounded-full border border-border px-3 py-1 text-fg-subtle">
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
