import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type TopicPickerProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

/** One compact button that opens a menu of conversation topics. */
export function TopicPicker({ options, value, onChange }: TopicPickerProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const openMenu = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const choose = (opt: string) => {
    onChange(opt);
    setOpen(false);
    btn.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(options[active]);
    }
  };

  return (
    <div ref={wrap} className="relative w-full max-w-sm" onKeyDown={onKeyDown}>
      <button
        ref={btn}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : openMenu())}
        className="flex w-full items-center justify-between gap-3 rounded-full border border-border-strong bg-white/[0.06] px-5 py-3 text-left text-sm font-medium text-fg backdrop-blur transition-colors hover:border-accent/70 focus-visible:outline-2 focus-visible:outline-accent"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Conversation topics"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border-strong bg-[#0b1a16]/95 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          {options.map((opt, i) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(opt)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                i === active ? "bg-white/10 text-fg" : "text-fg-muted"
              }`}
            >
              <span>{opt}</span>
              {opt === value && <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
