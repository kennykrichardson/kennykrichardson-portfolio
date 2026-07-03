import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { MagneticButton } from "../components/MagneticButton";
import { projects } from "../data/content";
import { ShuffleText } from "../components/ShuffleText";

const sections = [
  { id: "portfolio", title: "Featured Products", eyebrow: "Built to show range" },
  { id: "commercial", title: "Client Work", eyebrow: "Client-facing work" },
] as const;

function ProjectColumn({ section }: { section: (typeof sections)[number] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const list = useMemo(() => projects.filter((project) => project.category === section.id), [section.id]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(list.length > 1);

  const updateScrollState = () => {
    const node = rowRef.current;
    if (!node) return;
    setCanScrollLeft(node.scrollLeft > 4);
    setCanScrollRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 4);
  };

  const scrollByCard = (direction: -1 | 1) => {
    const node = rowRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.max(320, node.clientWidth * 0.82), behavior: "smooth" });
    window.setTimeout(updateScrollState, 380);
  };

  return (
    <div className="project-section">
      <div className="project-section__head">
        <span>{section.eyebrow}</span>
        <h2>{section.title}</h2>
        <div className="project-scroll-controls">
          <button type="button" aria-label={`Scroll ${section.title} left`} disabled={!canScrollLeft} onClick={() => scrollByCard(-1)}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label={`Scroll ${section.title} right`} disabled={!canScrollRight} onClick={() => scrollByCard(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="project-row" aria-label={section.title} ref={rowRef} onScroll={updateScrollState}>
        {list.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              className="project-panel reconstruct"
              key={project.title}
              initial={{ opacity: 0, y: 26, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: index * 0.075, duration: 0.72 }}
            >
              <div className="project-panel__image" style={{ backgroundImage: project.image ? `url(${project.image})` : undefined }} />
              <div className={`project-panel__visual bg-gradient-to-br ${project.accent}`}>
                <Icon size={58} />
                <div className="project-panel__grid" />
                <span>{project.status}</span>
              </div>
              <div className="project-panel__body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="chips">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="project-panel__overlay">
                <div>
                  <p className="eyebrow">VISIT THE PROJECT</p>
                  <h3>{project.title}</h3>
                </div>
                <div className="project-panel__actions" data-centered={!project.live && project.title === "Fluid Deck AI"}>
                  {project.live && (
                    <MagneticButton icon="globe" href={project.live}>
                      Live Site
                    </MagneticButton>
                  )}
                  <MagneticButton icon="github" variant="ghost" href={project.repo}>
                    GitHub Repository
                  </MagneticButton>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section className="page-shell projects">
      <div className="section-heading reconstruct">
        <p className="eyebrow">Showcase</p>
        <h1 className="text-9xl font-bold"><ShuffleText text = "Pro" delay={120} /><strong className="hero-pagename"><ShuffleText text = "Jects" delay={120} /></strong></h1>
      </div>
      <div className="project-rows">
        {sections.map((section) => (
          <ProjectColumn key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}