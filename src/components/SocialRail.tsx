import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

type SocialLink = {
  label: string;
  href: string;
  icon: typeof FaGithub;
  external?: boolean;
};

const socials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kennykrichardson",
    icon: FaInstagram,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kennykrichardson/",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/kennykrichardson",
    icon: FaGithub,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:kennykrichardson@gmail.com",
    icon: Mail,
  },
];

const socialVariants: Variants = {
  initial: {
    x: 0,
    y: 0,
    rotate: 0,
  },
  hover: {
    x: [0, 4, -5, 2, 0],
    y: [0, -3, 3, -1, 0],
    rotate: [0, 1, -1, 0.5, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  focus: {
    y: -2,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
};

export function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social links">
      {socials.map(({ label, href, icon: Icon, external }) => (
        <motion.a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
          variants={socialVariants}
          initial="initial"
          whileHover="hover"
          whileFocus="focus"
        >
          <Icon size={18} aria-hidden="true" focusable="false" />
          <span>{label}</span>
        </motion.a>
      ))}
    </aside>
  );
}
