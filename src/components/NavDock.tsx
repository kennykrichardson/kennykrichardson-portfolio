import { Home, Layers3, Mail, TerminalSquare } from "lucide-react";
import { motion } from "framer-motion";
import type { PageId } from "../data/content";

const items: Array<{ id: PageId; label: string; icon: typeof Home }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers3 },
  { id: "skills", label: "Skills", icon: TerminalSquare },
  { id: "contact", label: "Contact", icon: Mail },
];

type NavDockProps = {
  active: PageId;
  onChange: (page: PageId) => void;
};

export function NavDock({ active, onChange }: NavDockProps) {
  return (
    <nav className="dock" aria-label="Primary navigation">
      {items.map((item, index) => {
        const Icon = item.icon;
        const selected = active === item.id;
        return (
          <motion.button
            key={item.id}
            className="dock__item"
            data-active={selected}
            onClick={() => onChange(item.id)}
            whileHover={{ y: -7, scale: 1.08 }}
            whileTap={{ scale: 0.94, filter: "blur(1px)" }}
            type="button"
            aria-label={item.label}
          >
            <span className="dock__halo" />
            <Icon size={24} strokeWidth={selected ? 2.4 : 1.8} />
            <span className="dock__label">{item.label}</span>
            <span className="dock__glitch" aria-hidden="true">{item.label}</span>
            <small>{`r${index + 1}`}</small>
            {selected && <motion.i layoutId="dock-underline" className="dock__underline" />}
          </motion.button>
        );
      })}
    </nav>
  );
}
