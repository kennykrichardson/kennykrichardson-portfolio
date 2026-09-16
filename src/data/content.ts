import {
  Bot,
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  Dumbbell,
  FileSearch,
  Globe2,
  LayoutDashboard,
  Map,
  Presentation,
  WalletCards,
  StarCheck,
  Book
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import flashtextImage from "../assets/projects/flashtext.jpeg";
import fluidDeckImage from "../assets/projects/fluid-deck.png";
import geotrailImage from "../assets/projects/geotrail.png";
import nishaImage from "../assets/projects/nisha-fitness.jpg";
import orzynImage from "../assets/projects/orzyn-ai.png";
import quartlyImage from "../assets/projects/quartly.jpeg";
import mnemosyneImage from "../assets/projects/mnemosyne.png";
import habrynImage from "../assets/projects/habryn.png"
import volumineImage from "../assets/projects/volumine.png"
import farvestImage from "../assets/projects/farvest.png"

export type PageId = "home" | "projects" | "certificates" | "skills" | "contact";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  category: "commercial" | "portfolio";
  repo: string;
  live?: string;
  image?: string;
  icon: LucideIcon;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Orzyn AI",
    description:
      "AI-powered GitHub intelligence platform.",
    stack: ["React", "AI", "GitHub API", "Analytics"],
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/orzyn-ai-m2.0",
    live: "https://orzyn-ai.onrender.com",
    image: orzynImage,
    icon: BrainCircuit,
    accent: "from-red-500/50 via-white/10 to-red-950/20",
  },
  {
    title: "Habryn Mars",
    description:
      "A Mars Colony Sim made with Mesa and Python.",
    stack: ["Mesa", "Python", "Solara", "Blender"],
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/habryn-mesa-mars-colony",
    image: habrynImage,
    icon: StarCheck,
    accent: "from-red-500/50 via-white/10 to-red-950/20",
  },
  {
    title: "Quartly",
    description:
      "Modern AI-powered Finance dashboard.",
    stack: ["React", "Charts", "PDF", "Finance"],
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/quartly-finance-tracker",
    live: "https://quartly.onrender.com",
    image: quartlyImage,
    icon: WalletCards,
    accent: "from-red-400/45 via-rose-200/10 to-black",
  },
  {
    title: "FlashFrame OCR",
    description: "Privacy-first OCR application built with Tesseract.js",
    stack: ["Tesseract.js", "OCR", "TypeScript"],
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/flashtext-ocr",
    live: "https://flashtext-ocr.vercel.app",
    image: flashtextImage,
    icon: FileSearch,
    accent: "from-white/25 via-red-500/25 to-black",
  },
  {
    title: "Farvest",
    description:
      "A Smart Farming Simulation made with Mesa and Python.",
    stack: ["Mesa", "Python", "Solara"],
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/farvest-mesa-smart-farming",
    image: farvestImage,
    icon: StarCheck,
    accent: "from-red-500/50 via-white/10 to-red-950/20",
  },
  {
    title: "GeoTrail",
    description:
      "Interactive travel exploration platform with maps.",
    stack: ["Maps", "Analytics", "React"],
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/geotrail",
    live: "https://geotrail.onrender.com",
    image: geotrailImage,
    icon: Map,
    accent: "from-red-500/40 via-slate-100/10 to-black",
  },
  {
    title: "Fluid Deck AI",
    description:
      "Local PowerPoint Slide AI parser.",
    stack: ["AI Parser", "PowerPoint", "Local", "Automation"],
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/fluid-deck-ai",
    image: fluidDeckImage,
    icon: Presentation,
    accent: "from-red-600/40 via-white/15 to-zinc-950",
  },
  {
    title: "EchoDrive",
    description:
      "Desktop second-brain application for all files.",
    stack: ["Electron", "SQLite", "LanceDB", "Local AI"],
    category: "portfolio",
    image: mnemosyneImage,
    repo: "https://github.com/kennykrichardson/echodrive",
    icon: Database,
    accent: "from-red-500/45 via-zinc-100/10 to-black",
  },
  {
    title: "Volumine",
    description:
      "Java Swing Application for Library Management.",
    stack: ["Java", "Swing", "SQLite", "React"],
    category: "portfolio",
    image: volumineImage,
    repo: "https://github.com/kennykrichardson/volumine-library-manager",
    icon: Book,
    accent: "from-red-500/45 via-zinc-100/10 to-black",
  },
  {
    title: "Nisha's Fitness Studio",
    description: "Fitness website with high-energy animations.",
    stack: ["React", "Motion", "Brand"],
    category: "commercial",
    repo: "https://github.com/kennykrichardson/nishas-fitness-studio",
    live: "https://nishasfitness.onrender.com",
    image: nishaImage,
    icon: Dumbbell,
    accent: "from-red-500/50 via-orange-100/10 to-black",
  },
];

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  { title: "Languages", icon: Code2, skills: ["Python", "JavaScript", "TypeScript", "C++", "Java", "Rust", "SQL", "HTML5", "CSS3", "Kotlin", "Swift"] },
  {
    title: "Frontend",
    icon: LayoutDashboard,
    skills: ["React", "TailwindCSS", "Framer Motion", "GSAP", "Three.js", "React Three Fiber", "Vite", "Recharts", "PWA"],
  },
  { title: "Backend", icon: Boxes, skills: ["Python", "Node.js", "Express", "FastAPI", "REST APIs", "Mesa/Solara", "API Design", "Middleware", "BLOB API"] },
  {
    title: "AI / ML",
    icon: Bot,
    skills: ["Deep Learning", "Fine-Tuning", "Database-Generation", "NLP", "Machine Learning", "LLMs", "Huggingface", "Embeddings", "Jupyter Notebook", "OCR", "Transformers.js", "Prompt Engineering", "Vector Databases", "Semantic Search", "Local AI", "Inference Pipelines"],
  },
  { title: "Databases", icon: Database, skills: ["Electron", "SQLite", "LanceDB", "PostgreSQl", "Firebase", "Git", "GitHub", "MongoDB"] },
  { title: "Tools", icon: Globe2, skills: ["VS Code", "Thunder Client", "Render", "Vercel", "Netlify", "Cloudfare", "npm", "pnpm", "CI/CD"] },
];
