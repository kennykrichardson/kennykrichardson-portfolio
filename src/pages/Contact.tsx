import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { MagneticButton } from "../components/MagneticButton";
import { ShuffleText } from "../components/ShuffleText";
import { useState } from "react";

export function Contact() {
const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
});

const handleWhatsApp = () => {
  const text = `Hi Kenny,

Name: ${form.name}

Email: ${form.email}

Message:

${form.message}`;

  window.open(
    `https://wa.me/919949922744?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};

const handleEmail = () => {
  const subject = `Portfolio Inquiry from ${form.name}`;

  const body = `Name: ${form.name}

Email: ${form.email}

Message:

${form.message}`;

  window.location.href =
    `mailto:kennykrichardson@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

  return (
    <section className="page-shell contact">
      <motion.div className="contact__panel reconstruct" initial={{ opacity: 0, y: 40, filter: "blur(18px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}>
        <div className="contact__copy">
          <p className="eyebrow">Hiring channel</p>
          <h1><ShuffleText text="Let'&apos;s get in touch." delay={120} /></h1>
          <p>
          Whether you're hiring for an engineering role, launching an AI product,
          or looking for a developer to bring an idea to life, I'd love to hear about it.⚡
          </p>
          <div className="contact__links">
            <a href="mailto:kennykrichardson@gmail.com">
              <Mail size={18} /> Email
            </a>
            <a href="https://github.com/kennykrichardson" target="_blank" rel="noreferrer">
              <FaGithub size={18} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kenny-richardson-kodipally-250501217/" target="_blank" rel="noreferrer">
              <FaLinkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
        <form className="contact-form">
          <label>
            <span>Name</span>
            <input
              placeholder="Hiring manager or team name"
              value={form.name}
              onChange={(e) =>
                setForm({
                 ...form,
                name: e.target.value,
                })
              }
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              placeholder="you@domain.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </label>

          <label>
            <span>Message</span>
            <textarea
              placeholder="Tell me about your product, your vision, and what you're looking for in an engineer."
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm({
                ...form,
                message: e.target.value,
             })
            }
          />

          </label>
<div
  style={{
    display: "grid",
    gap: "1rem",
  }}
>
  <MagneticButton
    icon="send"
    type="button"
    onClick={handleWhatsApp}
  >
    WhatsApp
  </MagneticButton>

  <MagneticButton
    icon="mail"
    variant="ghost"
    type="button"
    onClick={handleEmail}
  >
    Email
  </MagneticButton>
</div>
        </form>
      </motion.div>
    </section>
  );
}
