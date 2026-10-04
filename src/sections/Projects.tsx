import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
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

        <div className="mt-16 grid gap-8 md:gap-10">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <article className="group rounded-3xl border border-border bg-bg-card overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_20px_60px_-30px_rgba(18,102,90,0.35)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
                  <div className={index % 2 === 1 ? "min-w-0 lg:order-2" : "min-w-0"}>
                    <ProjectVisual project={project} />
                  </div>

                  <div className="min-w-0 p-7 md:p-10 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle">{project.category}</p>
                      <span className={`text-xs rounded-full border px-3 py-0.5 ${statusStyles[project.status]}`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl md:text-3xl text-fg text-balance">{project.title}</h3>
                    <p className="mt-4 text-fg-muted leading-relaxed text-[15px]">{project.result}</p>

                    {project.metrics && (
                      <dl className="mt-6 grid grid-cols-2 gap-3">
                        {project.metrics.map((metric) => (
                          <div key={metric.label} className="rounded-xl border border-border bg-bg px-4 py-3">
                            <dt className="sr-only">{metric.label}</dt>
                            <dd className="font-display text-2xl text-accent leading-none">{metric.value}</dd>
                            <p className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-fg-subtle" aria-hidden="true">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </dl>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs rounded-full border border-border px-3 py-1 text-fg-subtle">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded"
                      >
                        Read the case study
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                      {project.links?.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-accent transition-colors"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

/** Screenshot framed like an app window, or - for internal work with no public
 *  screenshot - a pipeline diagram of how the system is put together. */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="h-full bg-bg p-4 md:p-6 lg:p-8 flex items-center">
      <div className="w-full rounded-xl border border-border-strong bg-bg-elevated overflow-hidden shadow-[0_12px_40px_-20px_rgba(32,28,22,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-border px-3.5 py-2.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-fg-subtle/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-subtle/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-subtle/40" />
          <span className="ml-3 text-[11px] text-fg-subtle truncate">
            {project.imageCaption ?? "Architecture overview"}
          </span>
        </div>

        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt ?? project.title}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="p-6 md:p-8">
            <ol className="space-y-3">
              {project.pipeline?.map((step, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs font-medium text-accent">
                    {i + 1}
                  </span>
                  <span className="flex-1 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-fg-muted">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-center gap-2 text-xs text-fg-subtle">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Internal company platform - screenshots not public
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
