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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import flashframeImage from "../assets/projects/flashframe.jpg";
import fluidDeckImage from "../assets/projects/fluid-deck.jpg";
import geotrailImage from "../assets/projects/geotrail.jpg";
import nishaImage from "../assets/projects/nisha-fitness.jpg";
import orzynImage from "../assets/projects/orzyn-ai.jpg";
import quartlyImage from "../assets/projects/quartly.jpg";

export type PageId = "home" | "projects" | "skills" | "contact";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  status: string;
  category: "commercial" | "portfolio";
  repo: string;
  live?: string;
  image?: string;
  icon: LucideIcon;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Orzyn AI Developer Intelligence",
    description:
      "AI-powered developer intelligence platform that analyzes GitHub repositories, engineering velocity, contributor risk, and repository health.",
    stack: ["React", "AI", "GitHub API", "Analytics"],
    status: "Intelligence platform",
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/orzyn-ai-developer-intelligence",
    live: "https://orzyn-ai.onrender.com",
    image: orzynImage,
    icon: BrainCircuit,
    accent: "from-red-500/50 via-white/10 to-red-950/20",
  },
  {
    title: "Quartly Finance Tracker",
    description:
      "Modern AI-powered finance dashboard featuring analytics, budgeting, PDF export, and a refined glassmorphism interface.",
    stack: ["React", "Charts", "PDF", "Finance"],
    status: "Dashboard system",
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/quartly-finance-tracker",
    live: "https://quartly.onrender.com",
    image: quartlyImage,
    icon: WalletCards,
    accent: "from-red-400/45 via-rose-200/10 to-black",
  },
  {
    title: "FlashFrame OCR",
    description: "Privacy-first OCR application built with Tesseract.js for fast local text extraction.",
    stack: ["Tesseract.js", "OCR", "Privacy", "TypeScript"],
    status: "Local utility",
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/flashframe-ocr",
    live: "https://flashframe-ocr.vercel.app",
    image: flashframeImage,
    icon: FileSearch,
    accent: "from-white/25 via-red-500/25 to-black",
  },
  {
    title: "GeoTrail",
    description:
      "Interactive travel exploration platform with maps, tourism analytics, and immersive location visualizations.",
    stack: ["Maps", "Analytics", "Visualization", "React"],
    status: "Exploration platform",
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
      "PowerPoint AI parser that extracts slides, speaker notes, and structured presentation data locally.",
    stack: ["AI Parser", "PowerPoint", "Local", "Automation"],
    status: "Document intelligence",
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/fluid-deck-ai",
    image: fluidDeckImage,
    icon: Presentation,
    accent: "from-red-600/40 via-white/15 to-zinc-950",
  },
  {
    title: "EchoDrive",
    description:
      "Desktop second-brain application for documents, screenshots, semantic search, and local AI workflows.",
    stack: ["Electron", "SQLite", "LanceDB", "Local AI"],
    status: "Desktop app",
    category: "portfolio",
    repo: "https://github.com/kennykrichardson/echodrive",
    icon: Database,
    accent: "from-red-500/45 via-zinc-100/10 to-black",
  },
  {
    title: "Nisha's Fitness Center",
    description: "Modern fitness website with high-energy motion, clean layouts, and premium visual pacing.",
    stack: ["React", "Motion", "Responsive", "Brand"],
    status: "Brand website",
    category: "commercial",
    repo: "https://github.com/kennykrichardson/nishas-fitness-center",
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
  { title: "Languages", icon: Code2, skills: ["JavaScript", "TypeScript", "Python", "C++"] },
  {
    title: "Frontend",
    icon: LayoutDashboard,
    skills: ["React", "TailwindCSS", "Framer Motion", "GSAP", "Three.js", "React Three Fiber"],
  },
  { title: "Backend", icon: Boxes, skills: ["Node.js", "Express", "FastAPI", "REST APIs"] },
  {
    title: "AI / ML",
    icon: Bot,
    skills: ["Ollama", "Transformers.js", "LLMs", "Prompt Engineering", "Vector Databases", "Semantic Search", "OCR"],
  },
  { title: "Desktop", icon: Database, skills: ["Electron", "SQLite", "LanceDB", "Git", "GitHub"] },
  { title: "Tools", icon: Globe2, skills: ["VS Code", "Postman", "Thunder Client", "Render", "Vercel"] },
];
