import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/kennykrichardson", icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kennykrichardson/", icon: FaLinkedin },
  { label: "GitHub", href: "https://www.github.com/kennykrichardson", icon: FaGithub },
  { label: "Email", href: "mailto:kennykrichardson@gmail.com", icon: Mail },
];

export function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social links">
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={social.label}
            whileHover={{ x: [0, 4, -5, 2, 0], y: [0, -3, 3, -1, 0] }}
            transition={{ duration: 0.22 }}
          >
            <Icon size={18} />
            <span>{social.label}</span>
          </motion.a>
        );
      })}
    </aside>
  );
}
