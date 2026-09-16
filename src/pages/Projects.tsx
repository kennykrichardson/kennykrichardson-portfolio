import { motion } from "framer-motion";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { MagneticButton } from "../components/MagneticButton";
import { ShuffleText } from "../components/ShuffleText";
import { projects } from "../data/content";

const sections = [
  {
    id: "portfolio",
    title: "Featured Products",
    eyebrow: "Built to show range",
  },
  {
    id: "commercial",
    title: "Client Work",
    eyebrow: "Client-facing work",
  },
] as const;

type ProjectSection = (typeof sections)[number];

const CASCADE_CSS = `
  .projects-cascade {
    position: relative;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    user-select: none;
    -webkit-user-select: none;
    touch-action: pan-y;
    overflow: visible;
  }

  .projects-cascade__slides {
    position: relative;
    width: 100%;
    height: 470px;
    overflow: visible;
  }

  .project-cascade-card {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(390px, 70vw);
    transform: translateY(-50%) translateX(-50%) scale(0.3);
    transition:
      transform 1s ease,
      opacity 1s ease,
      filter 1s ease;
    opacity: 0;
    z-index: 1;
    cursor: grab;
  }

  .project-cascade-card:active {
    cursor: grabbing;
  }

  /* First shadow on the right, matching the source carousel */
  .project-cascade-card.is-next {
    left: 50%;
    transform: translateY(-50%) translateX(-130%) scale(0.55);
    opacity: 0.72;
    z-index: 4;
    filter: grayscale(0.95) brightness(0.55);
  }

  /* First shadow on the left, matching the source carousel */
  .project-cascade-card.is-prev {
    left: 50%;
    transform: translateY(-50%) translateX(30%) scale(0.55);
    opacity: 0.72;
    z-index: 4;
    filter: grayscale(0.95) brightness(0.55);
  }

  /* Second shadow on the right */
  .project-cascade-card.is-next-2 {
    left: 50%;
    transform: translateY(-50%) translateX(-180%) scale(0.37);
    opacity: 0.34;
    z-index: 2;
    filter: grayscale(1) brightness(0.38);
  }

  /* Second shadow on the left */
  .project-cascade-card.is-prev-2 {
    left: 50%;
    transform: translateY(-50%) translateX(80%) scale(0.37);
    opacity: 0.34;
    z-index: 2;
    filter: grayscale(1) brightness(0.38);
  }

  .project-cascade-card.is-now {
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(1);
    opacity: 1;
    z-index: 5;
    filter: none;
    cursor: default;
  }

  .project-cascade-card__inner {
    position: relative;
    width: 100%;
    min-height: 390px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 18px;
    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.08),
        rgba(255, 255, 255, 0.025)
      ),
      rgba(8, 8, 10, 0.92);
    box-shadow:
      0 35px 90px rgba(0, 0, 0, 0.55),
      inset 0 0 0 1px rgba(255, 255, 255, 0.025);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .project-cascade-card__image {
    position: relative;
    width: 100%;
    height: 210px;
    background-size: cover;
    background-position: center;
    background-color: #0c0c0f;
    overflow: hidden;
  }

  .project-cascade-card__image::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to bottom,
        transparent 40%,
        rgba(5, 5, 7, 0.92) 100%
      );
    pointer-events: none;
  }

  .project-cascade-card__grid {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.22;
    background-image:
      linear-gradient(
        rgba(255, 255, 255, 0.08) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.08) 1px,
        transparent 1px
      );
    background-size: 30px 30px;
    pointer-events: none;
  }

  .project-cascade-card__body {
    position: relative;
    z-index: 2;
    padding: 1.35rem 1.4rem 1.45rem;
  }

  .project-cascade-card__body h3 {
    margin: 0 0 0.55rem;
    color: #fff;
    font-family: var(--display-font);
    font-size: 1.35rem;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .project-cascade-card__body p {
    margin: 0;
    color: rgba(255, 255, 255, 0.58);
    font-size: 0.75rem;
    line-height: 1.7;
  }

  .project-cascade-card__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1rem;
  }

  .project-cascade-card__chips span {
    padding: 0.32rem 0.55rem;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.035);
    color: rgba(255, 255, 255, 0.58);
    font-family: var(--display-font);
    font-size: 0.54rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  /*
    Existing hover interaction preserved:
    the overlay only becomes visible when the project card is hovered.
  */

  .project-cascade-card__overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.4rem;
    background:
      radial-gradient(
        circle at center,
        rgba(45, 45, 52, 0.28),
        rgba(5, 5, 7, 0.96) 78%
      );
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.35s ease,
      backdrop-filter 0.35s ease;
    backdrop-filter: blur(0);
    -webkit-backdrop-filter: blur(0);
  }

  .project-cascade-card.is-now:hover .project-cascade-card__overlay {
    opacity: 1;
    pointer-events: auto;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .project-cascade-card__overlay .eyebrow {
    margin: 0 0 0.45rem;
  }

  .project-cascade-card__overlay h3 {
    margin: 0;
    color: #fff;
    font-family: var(--display-font);
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .project-cascade-card__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    flex-wrap: wrap;
  }

  .project-cascade-card__actions > * {
    flex: 0 0 auto;
  }

  .projects-cascade__arrow {
    position: absolute;
    top: 50%;
    z-index: 20;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 50%;
    background: rgba(5, 5, 7, 0.55);
    color: white;
    cursor: pointer;
    transform: translateY(-50%);
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s ease,
      opacity 0.25s ease;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .projects-cascade__arrow:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.32);
    transform: translateY(-50%) scale(1.08);
  }

  .projects-cascade__arrow:disabled {
    opacity: 0.25;
    cursor: default;
  }

  .projects-cascade__arrow--left {
    left: 1rem;
  }

  .projects-cascade__arrow--right {
    right: 1rem;
  }

  @media (max-width: 900px) {
    .projects-cascade__slides {
      height: 430px;
    }

    .project-cascade-card {
      width: min(350px, 68vw);
    }

    .project-cascade-card.is-next {
      transform: translate(-112%, -50%) scale(0.56);
    }

    .project-cascade-card.is-prev {
      transform: translate(12%, -50%) scale(0.56);
    }

    .project-cascade-card.is-next-2 {
      transform: translate(-150%, -50%) scale(0.35);
      opacity: 0.34;
    }

    .project-cascade-card.is-prev-2 {
      transform: translate(50%, -50%) scale(0.35);
      opacity: 0.34;
    }

    .projects-cascade__arrow--left {
      left: 0;
    }

    .projects-cascade__arrow--right {
      right: 0;
    }
  }


  .projects-toggle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 1.25rem auto 0;
    padding: 4px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 999px;
    background: rgba(10, 10, 12, 0.62);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.025),
      0 12px 40px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .projects-toggle__option {
    position: relative;
    min-width: 9.5rem;
    padding: 0.7rem 1.15rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: rgba(255, 255, 255, 0.46);
    font-family: var(--display-font);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    z-index: 1;
  }

  .projects-toggle__option.is-active {
    color: #fff;
  }

  .projects-toggle__indicator {
    position: absolute;
    pointer-events: none;
    inset: 4px auto 4px 4px;
    width: calc(50% - 4px);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.08),
      0 5px 20px rgba(0, 0, 0, 0.28);
  }

  .projects-toggle__indicator.is-client {
    transform: translateX(100%);
  }

  @media (max-width: 640px) {
    .projects-cascade__slides {
      height: 410px;
    }

    .project-cascade-card {
      width: min(330px, 76vw);
    }

    .project-cascade-card.is-next,
    .project-cascade-card.is-prev {
      opacity: 0.5;
    }

    .project-cascade-card.is-next {
      transform: translate(-92%, -50%) scale(0.5);
    }

    .project-cascade-card.is-prev {
      transform: translate(-8%, -50%) scale(0.5);
    }

    .project-cascade-card.is-next-2,
    .project-cascade-card.is-prev-2 {
      opacity: 0.34;
      transform: translate(-135%, -50%) scale(0.32);
    }

    .project-cascade-card.is-prev-2 {
      transform: translate(35%, -50%) scale(0.32);
    }

    .projects-cascade__arrow {
      width: 40px;
      height: 40px;
    }
  }
`;

const getSlideClass = (
  index: number,
  activeIndex: number,
  total: number,
) => {
  const diff = index - activeIndex;

  if (diff === 0) return "is-now";

  if (diff === 1 || diff === -total + 1) {
    return "is-next";
  }

  if (diff === -1 || diff === total - 1) {
    return "is-prev";
  }

  if (diff === 2 || diff === -total + 2) {
    return "is-next-2";
  }

  if (diff === -2 || diff === total - 2) {
    return "is-prev-2";
  }

  return "";
};

function ProjectCascade({
  section,
}: {
  section: ProjectSection;
}) {
  const list = projects.filter(
    (project) => project.category === section.id,
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const swipeThreshold = 50;
  const total = list.length;

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (total <= 1) return;

      setActiveIndex((current) => {
        if (direction === "next") {
          return (current + 1) % total;
        }

        return (current - 1 + total) % total;
      });
    },
    [total],
  );

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleEnd = (clientX: number) => {
    if (!isDragging) return;

    const distance = clientX - startX;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance < 0) {
        navigate("next");
      } else {
        navigate("prev");
      }
    }

    setIsDragging(false);
    setStartX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleEnd(e.clientX);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging) {
      handleEnd(e.clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleEnd(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [section.id]);

  if (!list.length) {
    return null;
  }

  return (
    <div className="project-section">
      <div
        className="projects-cascade"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="projects-cascade__slides">
          {list.map((project, index) => {
            const slideClass = getSlideClass(
              index,
              activeIndex,
              total,
            );

            return (
              <motion.article
                key={project.title}
                className={`project-cascade-card ${slideClass}`}
                initial={{
                  opacity: 0,
                  filter: "blur(12px)",
                }}
                animate={{
                  opacity:
                    slideClass === "is-now"
                      ? 1
                      : slideClass === "is-next" ||
                          slideClass === "is-prev"
                        ? 0.72
                        : slideClass === "is-next-2" ||
                            slideClass === "is-prev-2"
                          ? 0.34
                          : 0,
                  filter:
                    slideClass === "is-now"
                      ? "none"
                      : slideClass === "is-next" ||
                          slideClass === "is-prev"
                        ? "grayscale(0.95) brightness(0.55)"
                        : slideClass === "is-next-2" ||
                            slideClass === "is-prev-2"
                          ? "grayscale(1) brightness(0.38)"
                          : "blur(12px)",
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.05,
                }}
                onClick={() => {
                  if (index !== activeIndex) {
                    setActiveIndex(index);
                  }
                }}
              >
                <div className="project-cascade-card__inner">
                  <div
                    className="project-cascade-card__image"
                    style={{
                      backgroundImage: project.image
                        ? `url(${project.image})`
                        : undefined,
                    }}
                  >
                    <div className="project-cascade-card__grid" />
                  </div>

                  <div className="project-cascade-card__body">
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-cascade-card__chips">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>

                  {/* Existing project hover interaction */}
                  <div className="project-cascade-card__overlay">
                    <div>
                      <p className="eyebrow">
                        VISIT THE PROJECT
                      </p>

                      <h3>{project.title}</h3>
                    </div>

                    <div
                      className="project-cascade-card__actions"
                      data-centered={
                        !project.live &&
                        project.title === "Fluid Deck AI"
                      }
                    >
                      {project.live && (
                        <MagneticButton
                          icon="globe"
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Site
                        </MagneticButton>
                      )}

                      <MagneticButton
                        icon="github"
                        variant="ghost"
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub Repository
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              className="projects-cascade__arrow projects-cascade__arrow--left"
              aria-label={`Previous ${section.title}`}
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ArrowLeftCircle size={28} />
            </button>

            <button
              type="button"
              className="projects-cascade__arrow projects-cascade__arrow--right"
              aria-label={`Next ${section.title}`}
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ArrowRightCircle size={28} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const [activeSection, setActiveSection] = useState<ProjectSection>(
    sections[0],
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: CASCADE_CSS,
        }}
      />

      <section className="page-shell projects">
        <div className="section-heading reconstruct">
          <p className="eyebrow">Showcase</p>

          <h1 className="text-9xl font-bold">
            <ShuffleText
              text="Pro"
              delay={120}
            />

            <strong className="hero-pagename">
              <ShuffleText
                text="Jects"
                delay={120}
              />
            </strong>
          </h1>
        </div>

        <div
          className="projects-toggle"
          role="tablist"
          aria-label="Project category"
        >
          <motion.div
            className={`projects-toggle__indicator ${
              activeSection.id === "commercial"
                ? "is-client"
                : ""
            }`}
            animate={{
              x: activeSection.id === "commercial" ? "100%" : "0%",
            }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 32,
              mass: 0.7,
            }}
          />

          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={activeSection.id === section.id}
              className={`projects-toggle__option ${
                activeSection.id === section.id
                  ? "is-active"
                  : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="project-rows">
          <ProjectCascade section={activeSection} />
        </div>
      </section>
    </>
  );
}
