import { ArrowRight, Download, Globe2, Send, Mail } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";

const iconMap = {
  arrow: ArrowRight,
  download: Download,
  globe: Globe2,
  github: FaGithub,
  send: Send,
  mail: Mail,
};

type MagneticButtonProps = {
  children: ReactNode;
  icon?: keyof typeof iconMap;
  href?: string;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";

  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;

  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export function MagneticButton({ children, icon = "arrow", href, variant = "primary", type = "button", target, rel, onClick }: MagneticButtonProps) {
  const Icon = iconMap[icon];
  const className = `magnetic-button magnetic-button--${variant}`;
  const content = (
    <>
      <span className="magnetic-button__sweep" />
      <span>{children}</span>
      <Icon size={21} />
    </>
  );

  if (href) {
    return (
      <motion.a className={className} href={href} target={target} rel={rel} onClick={onClick} whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button className={className} type={type} onClick={onClick} whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}>
      {content}
    </motion.button>
  );
}
