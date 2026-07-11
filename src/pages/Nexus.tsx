import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Cuboid, Infinity, Layers3 } from "lucide-react";
import heroImage from "../assets/reference-hero.png";
import { MagneticButton } from "../components/MagneticButton";
import { ShuffleText } from "../components/ShuffleText";
import type { PageId } from "../data/content";

const stats = [
  { value: "10", label: "Projects shipped", icon: Cuboid },
  { value: "03+", label: "Years learning", icon: Layers3 },
  { value: "20+", label: "Technologies explored", icon: Cpu },
  { value: "∞", label: "Zeal to build", icon: Infinity },
];

export function Home({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 18 });
  const imageX = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  return (
    <section
      className="home page-shell"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <div className="home__copy reconstruct">
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
          <MagneticButton variant="ghost" icon="download" href="/richardsoncv.pdf" target="_blank" rel="noreferrer">
            Download Resume
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
      <motion.div className="home__portrait" style={{ x: imageX, y: imageY }} initial={{ opacity: 0, x: 70, filter: "blur(20px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: 1.1, delay: 0.25 }}>
        <div className="quote">
          <b>&ldquo;</b>
          <span className="quote__text text-gradient size-xl">
            Code is how I turn ideas into <em>reality.</em>
          </span>
        </div>
        <img src={heroImage} alt="Kenny Richardson cinematic portrait" />
      </motion.div>
    </section>
  );
}
