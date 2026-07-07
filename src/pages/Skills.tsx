import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { skillGroups } from "../data/content";

function CountUp({ value, color, }: { value: number; color: string }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 85, damping: 18 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionValue.set(value);
    return rounded.on("change", (latest) => setDisplay(latest));
  }, [motionValue, rounded, value]);

  return <span className="skills__percentage" style={{ color }}>
    {display}
  </span>;
}

export function Skills() {
  const [active, setActive] = useState(0);
  const activeGroup = skillGroups[active];
  const percentage = Math.round(((active + 1) / skillGroups.length) * 100);
  
  const accentColors = [
    "#00ff88", // Languages
    "#3b82f6", // Frameworks
    "#ff4d4d", // AI / ML
    "#facc15", // Backend
    "#a855f7", // Databases
    "#06b6d4", // Tools
  ];

  return (
    <section className="page-shell skills">
      <div className="skills__stage">
        <div className="section-heading reconstruct">
        </div>
        <div className="skills__board">
          <div className="skill-grid" onMouseLeave={() => setActive(0)}>
            {skillGroups.map((group, groupIndex) => {
              const Icon = group.icon;
              const selected = active === groupIndex;
              return (
                <motion.article
                  className="skill-card reconstruct"
                  data-active={selected}
                  key={group.title}
                  onMouseEnter={() => setActive(groupIndex)}
                  initial={{ opacity: 0, y: 30, rotateY: -8, filter: "blur(18px)" }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, filter: selected ? "blur(0px)" : "blur(2px)" }}
                  transition={{ delay: groupIndex * 0.06 }}
                >
                  <Icon size={32} />
                  <div className="skill-card__items">
                    {group.skills.map((skill, index) => (
                      <motion.span key={skill} initial={{ opacity: 0, y: 8 }} animate={{ opacity: selected ? 1 : 0.72, y: 0 }} transition={{ delay: selected ? index * 0.035 : 0 }}>
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="skills__readout" aria-live="polite">
            <CountUp value={percentage} color={accentColors[active]} />
            <AnimatePresence mode="wait">
              <motion.h2
                style={{ color: accentColors[active] }}
                key={activeGroup.title}
                initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(12px)" }}
                transition={{ duration: 0.28 }}
              >
                {activeGroup.title}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
