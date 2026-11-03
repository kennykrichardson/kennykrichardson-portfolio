import { motion } from "framer-motion";
import { Cpu, Cuboid, Infinity, Layers3 } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { ShuffleText } from "../components/ShuffleText";
import type { PageId } from "../data/content";
import { NeuralLink } from "../components/NeuralLink";
import redMoon from "../assets/redmoon.png";
import hero from "../assets/hero.png";

const stats = [
  { value: "20+", label: "Projects shipped", icon: Cuboid },
  { value: "03+", label: "Years learning", icon: Layers3 },
  { value: "20+", label: "Technologies explored", icon: Cpu },
  { value: "∞", label: "Zeal to build", icon: Infinity },
];

export function Home({ onNavigate }: { onNavigate: (page: PageId) => void }) {

  return (
    <section className="home page-shell">
      <div className="home__copy reconstruct">
        <img className="home__moon" src={redMoon} alt="" aria-hidden="true" />
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Hey, I&apos;m
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 36, filter: "blur(18px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.85 }}>
          <ShuffleText text="Kenny" />
          <strong className="hero-lastname">
            <ShuffleText text="Richardson" delay={120} />
          </strong>
        </motion.h1>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          AI Engineer & Full-Stack Developer
        </motion.h2>
        <motion.p className="lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}>
          Builder of AI-powered software, desktop applications, developer tools and immersive experiences.
        </motion.p>
        <motion.div className="home__actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <span onClick={() => onNavigate("projects")}>
            <MagneticButton>Explore Projects</MagneticButton>
          </span>
          <MagneticButton variant="ghost" icon="download" href="/kennykrichardsoncv.pdf" download="Kenny_Richardson_Resume.pdf">
            Download Resume
          </MagneticButton>
          <MagneticButton href="https://github.com/kennykrichardson" icon="github">
            <span className="sr-only">GitHub</span>
          </MagneticButton>
        </motion.div>
        <motion.div className="stats" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.08 }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div className="stat" key={stat.label}>
                <Icon size={28} />
                <span>{stat.value}</span>
                <small>{stat.label}</small>
              </div>
            );
          })}
        </motion.div>
      </div>
      <motion.aside
        className="neural-links-stage"
        initial={{ opacity: 0, x: 54, filter: "blur(16px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.3 }}
        aria-label="More websites by Kenny Richardson"
      >
        <img
          className="neural-links-backdrop"
          src={hero}
          alt=""
          aria-hidden="true"
        />
        <div className="neural-links-list">
          <NeuralLink
            href="https://kennykrichardson-ai.onrender.com"
            label="Check out my AI Portfolio"
            index="01"
          />
          <NeuralLink
            href="https://kennykrichardson-ml.onrender.com"
            label="Check out my ML Projects"
            index="02"
          />
        </div>
      </motion.aside>
    </section>
  );
}
