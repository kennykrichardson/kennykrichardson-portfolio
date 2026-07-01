import { motion } from "framer-motion";

export function PageTransition({ activeKey }: { activeKey: string }) {
  return (
    <motion.div
      key={activeKey}
      className="page-transition"
      initial={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
      animate={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="page-transition__particles" />
      <div className="page-transition__scan" />
    </motion.div>
  );
}
