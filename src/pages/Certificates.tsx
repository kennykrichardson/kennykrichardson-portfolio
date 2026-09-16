import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { ShuffleText } from "../components/ShuffleText";

type Certificate = {
  month: string;
  year: string;
  type: "Competition" | "Hackathon" | "Course" | "Workshop" | "Other";
  title: string;
  issuer: string;
  description: string;
  image: string;
};

const certificates: Certificate[] = [
  {
    month: "AUG",
    year: "2026",
    type: "Competition",
    title: "1st Place – Portfolio Website Design Contest",
    issuer: "Zelvora Technologies",
    description: "Secured 1st place among 250+ participants for designing and developing a portfolio website.",
    image: "/certificates/zelvora.png",
  },
  {
    month: "JUL",
    year: "2026",
    type: "Hackathon",
    title: "MENTIS Hackathon",
    issuer: "MENTIS",
    description: "Participated and built an AI-Powered ADHD Management System with a 12-day program.",
    image: "/certificates/mentis.png",
  },
  {
    month: "APR",
    year: "2026",
    type: "Hackathon",
    title: "FinTech Hackathon",
    issuer: "FinTech",
    description: "Participated in the FinTech hackathon.",
    image: "/certificates/fintech.png",
  },
  {
    month: "JUN",
    year: "2026",
    type: "Hackathon",
    title: "Orzyn GenAI Hackathon",
    issuer: "Orzyn",
    description: "Built Orzyn AI that uses Qwen3.5 Coder via HuggingFace.",
    image: "/certificates/placeholder.png",
  },
  {
    month: "MAY",
    year: "2026",
    type: "Hackathon",
    title: "HydPyHack",
    issuer: "HydPyHack",
    description: "Participated in the HydPyHack hackathon.",
    image: "/certificates/placeholder.png",
  },
];

function CertificateCard({
  item,
  index,
  onOpen,
}: {
  item: Certificate;
  index: number;
  onOpen: (certificate: Certificate) => void;
}) {
  return (
    <motion.article
      className="certificate-card"
      initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.08, duration: 0.7 }}
      whileHover={{ y: -8 }}
      onClick={() => onOpen(item)}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} certificate`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(item);
        }
      }}
    >
      <div className="certificate-card__preview">
        <img
          src={item.image}
          alt={`${item.title} certificate`}
        />

        <div className="certificate-card__scan" />

        <span className="certificate-card__corner certificate-card__corner--tl" />
        <span className="certificate-card__corner certificate-card__corner--br" />

        <motion.div
          className="certificate-card__expand"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <Maximize2 size={18} />
          <span>VIEW CERTIFICATE</span>
        </motion.div>
      </div>

      <div className="certificate-card__meta">
        <span>{item.month} {item.year}</span>

        <b
          className={`certificate-card__badge certificate-card__badge--${item.type.toLowerCase()}`}
        >
          {item.type}
        </b>
      </div>

      <h3>{item.title}</h3>

      <p className="certificate-card__issuer">
        {item.issuer}
      </p>

      <p className="certificate-card__description">
        {item.description}
      </p>

      <button
        type="button"
        className="certificate-card__open"
        aria-label={`Open ${item.title}`}
        onClick={(event) => {
          event.stopPropagation();
          onOpen(item);
        }}
      >
        <ArrowUpRight size={20} />
      </button>
    </motion.article>
  );
}

export function Certificates() {
  const [activeFilter] = useState("All");
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const rowRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return certificates;
    return certificates.filter((certificate) => {
      if (activeFilter === "Hackathons") return certificate.type === "Hackathon";
      if (activeFilter === "Competitions") return certificate.type === "Competition";
      if (activeFilter === "Courses") return certificate.type === "Course";
      if (activeFilter === "Workshops") return certificate.type === "Workshop";
      return certificate.type === "Other";
    });
  }, [activeFilter]);

  const scroll = (direction: -1 | 1) => {
    const node = rowRef.current;
    if (!node) return;
    const card = node.querySelector(".certificate-card") as HTMLElement | null;
    if (!card) return;

    node.scrollBy({
      left: direction * (card.offsetWidth + 18),
      behavior: "smooth",
    });
  };

  return (
    <section className="page-shell certificates page-certificates">
      <div className="section-heading reconstruct">
        <p className="eyebrow text-crimson-400/80">Showcase</p>
        <h1 className="text-9xl font-bold"><ShuffleText text = "Certifi" delay={120} />
        <strong className="hero-lastname"><ShuffleText text = "Cates" delay={120} /></strong>
        </h1>
          <p className="certificates__subtitle text-crimson-400/80">
            <i>PROOF OF WORK</i> • <i>PROOF OF PROGRESS</i>
          </p>
      </div>

      <div className="certificate-carousel">
        <button className="certificate-arrow certificate-arrow--left" type="button" onClick={() => scroll(-1)} aria-label="Previous certificates">
          <ChevronLeft size={22} />
        </button>

        <div className="certificate-row" ref={rowRef}>
          {filtered.map((item, index) => (
            <CertificateCard
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              onOpen={setSelectedCertificate}
            />
          ))}
        </div>

        <button className="certificate-arrow certificate-arrow--right" type="button" onClick={() => scroll(1)} aria-label="Next certificates">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="certificate-progress">
        <span className="is-active" />
        <span />
        <span />
        <span />
      </div>

      <div className="certificates__bottom">
        <div className="certificates__milestone">
          <p><span /> Documented Milestones</p>
        </div>

        <div className="certificates__stats">
          <div>
            <strong>{certificates.length.toString().padStart(2, "0")}</strong>
            <span>Certificates</span>
          </div>
          <i />
          <div>
            <strong>∞</strong>
            <span>Continuous<br />Learning</span>
          </div>
        </div>
      </div>

<AnimatePresence>
  {selectedCertificate && (
    <motion.div
      className="certificate-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setSelectedCertificate(null)}
    >
      <motion.div
        className="certificate-lightbox__content"
        initial={{
          opacity: 0,
          scale: 0.82,
          y: 30,
          filter: "blur(12px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 0.88,
          y: 20,
          filter: "blur(8px)",
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="certificate-lightbox__close"
          onClick={() => setSelectedCertificate(null)}
          aria-label="Close certificate viewer"
        >
          <X size={24} />
        </button>

        <div className="certificate-lightbox__image-wrap">
          <img
            src={selectedCertificate.image}
            alt={`${selectedCertificate.title} certificate in full view`}
          />
        </div>

        <div className="certificate-lightbox__info">
          <span>
            {selectedCertificate.month} {selectedCertificate.year}
          </span>

          <strong>
            {selectedCertificate.title}
          </strong>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}
