import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { profile } from "../data/profile";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "y-proc", label: "Y-PROC" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "section-shell flex items-center justify-between rounded-full transition-all duration-500",
            scrolled ? "bg-bg-elevated/80 backdrop-blur-md border border-border py-2 px-4 md:px-6 max-w-5xl mx-auto shadow-[0_10px_30px_-16px_rgba(32,28,22,0.35)]" : "py-0"
          )}
        >
          <a href="#home" className="text-2xl md:text-4xl text-fg hover:text-accent transition-colors" aria-label={`${profile.name} - home`}>
            <BrandMark />
          </a>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 md:px-5 md:py-2.5 text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-lg"
          >
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6 text-2xl font-display"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    aria-current={activeId === item.id ? "page" : undefined}
                    className={cn(
                      "transition-colors",
                      activeId === item.id ? "text-accent" : "text-fg hover:text-accent"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={profile.resumeUrl}
                  download
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-sans border border-border-strong rounded-full px-6 py-3 text-fg"
                >
                  Download Resume
                </a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
