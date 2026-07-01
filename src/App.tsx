import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { Suspense, lazy, useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import { BootIntro } from "./components/BootIntro";
import { CursorGlow } from "./components/CursorGlow";
import { NavDock } from "./components/NavDock";
import { PageTransition } from "./components/PageTransition";
import { ParticleField } from "./components/ParticleField";
import { SocialRail } from "./components/SocialRail";
import type { PageId } from "./data/content";

type PageComponent = ComponentType<{ onNavigate: (page: PageId) => void }>;

const HomePage = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const ProjectsPage = lazy(() => import("./pages/Projects").then((module) => ({ default: module.Projects })));
const SkillsPage = lazy(() => import("./pages/Skills").then((module) => ({ default: module.Skills })));
const ContactPage = lazy(() => import("./pages/Contact").then((module) => ({ default: module.Contact })));

const pages: Record<PageId, PageComponent> = {
  home: HomePage,
  projects: ProjectsPage,
  skills: SkillsPage,
  contact: ContactPage,
};

function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [booted, setBooted] = useState(false);
  const ActivePage = useMemo(() => pages[activePage], [activePage]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const changePage = useCallback((page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={`app page-${activePage}`}>
      <ParticleField />
      {activePage !== "home" && <div className="ambient-moon" aria-hidden="true" />}
      <CursorGlow />
      <div className="global-grain" />
      <header className="topbar">
        <span></span>
        <button type="button" onClick={() => changePage("contact")}>
          Let&apos;s connect
          <i />
        </button>
      </header>
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            className="page-frame"
            initial={{ opacity: 0, scale: 0.975, y: 28, filter: "blur(22px)" }}
            animate={{ opacity: booted ? 1 : 0, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.018, y: -18, filter: "blur(18px)" }}
            transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<div className="page-loader">Reconstructing node</div>}>
              <ActivePage onNavigate={changePage} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <PageTransition activeKey={activePage} />
      <NavDock active={activePage} onChange={changePage} />
      <SocialRail />
      <AnimatePresence>{!booted && <BootIntro onComplete={() => setBooted(true)} />}</AnimatePresence>
    </div>
  );
}

export default App;
