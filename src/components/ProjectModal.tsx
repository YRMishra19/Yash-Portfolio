import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.button
            type="button"
            aria-label="Close case study"
            className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full md:max-w-4xl max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border border-border-strong bg-bg-elevated p-8 md:p-12"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg hover:border-accent transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <p className="text-xs uppercase tracking-[0.25em] text-accent">{project.category}</p>
            <h3 id="project-modal-title" className="mt-3 font-display text-3xl md:text-4xl text-fg text-balance">
              {project.title}
            </h3>

            {project.image && (
              <figure className="mt-8">
                <img
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  className="w-full h-auto rounded-xl border border-border-strong"
                />
                {project.imageCaption && (
                  <figcaption className="mt-2 text-xs text-fg-subtle">{project.imageCaption}</figcaption>
                )}
              </figure>
            )}

            {project.metrics && (
              <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-border bg-bg px-4 py-3">
                    <dd className="font-display text-2xl text-accent leading-none">{metric.value}</dd>
                    <dt className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{metric.label}</dt>
                  </div>
                ))}
              </dl>
            )}

            {project.pipeline && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-3">Pipeline</p>
                <ol className="flex flex-col md:flex-row md:items-stretch gap-2">
                  {project.pipeline.map((step, i) => (
                    <li key={step} className="flex-1 flex items-center gap-2">
                      <span className="flex-1 h-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-fg-muted">
                        <span className="text-accent mr-1.5">{i + 1}.</span>
                        {step}
                      </span>
                      {i < project.pipeline!.length - 1 && (
                        <span className="hidden md:block text-fg-subtle" aria-hidden="true">
                          &rarr;
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-8 grid gap-6">
              <ModalBlock label="The Problem" text={project.problem} />
              <ModalBlock label="The Approach" text={project.approach} />
              <ModalBlock label="The Solution" text={project.solution} />
              <ModalBlock label="The Impact" text={project.result} />
              <ModalBlock label="My Role" text={project.role} />
            </div>

            {project.findings && <ModalList label="Key Findings" items={project.findings} />}
            {project.recommendations && <ModalList label="Recommendations" items={project.recommendations} />}

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-3">Technology</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-sm rounded-full border border-border px-3.5 py-1.5 text-fg-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.links && project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-1.5">{label}</p>
      <p className="text-fg-muted leading-relaxed text-[15px]">{text}</p>
    </div>
  );
}

function ModalList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-8">
      <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-3">{label}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-fg-muted leading-relaxed text-[15px]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
