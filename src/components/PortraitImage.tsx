import { motion } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type PortraitImageProps = {
  src: string;
  alt: string;
  note?: string;
  className?: string;
  imgClassName?: string;
  overlay?: boolean;
};

/**
 * A framed photo with a graceful fallback: if the image fails to load (e.g.
 * the file hasn't been added yet), it shows a small placeholder note instead
 * of a broken-image icon. When the image loads fine, the note never renders.
 *
 * The photo itself starts slightly zoomed in and eases out to its normal,
 * fully-visible size the first time it scrolls into view - a subtle
 * cinematic reveal rather than a static drop-in. Disabled under
 * prefers-reduced-motion.
 */
export function PortraitImage({
  src,
  alt,
  note = "[ADD IMAGE]",
  className = "relative aspect-[4/5] rounded-2xl overflow-hidden border border-border-strong bg-bg-elevated",
  imgClassName = "h-full w-full object-contain p-3",
  overlay = true,
}: PortraitImageProps) {
  const [failed, setFailed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={className}>
      {!failed && (
        <motion.img
          src={src}
          alt={alt}
          className={imgClassName}
          loading="lazy"
          onError={() => setFailed(true)}
          initial={prefersReducedMotion ? undefined : { scale: 1.22 }}
          whileInView={prefersReducedMotion ? undefined : { scale: 1 }}
          viewport={{ once: true, margin: "200px 0px", amount: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <p className="text-xs text-fg-subtle tracking-wide">{note}</p>
        </div>
      )}
      {overlay && !failed && (
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}
