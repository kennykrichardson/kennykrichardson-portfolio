import { motion } from "framer-motion";
import { MagneticButton } from "../components/MagneticButton";
import { ShuffleText } from "../components/ShuffleText";
import { useState } from "react";
import Email from "../assets/contacts/Email.svg";
import GitHub from "../assets/contacts/GitHub.svg";
import LinkedIn from "../assets/contacts/LinkedIn.svg";



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

  const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=kennykrichardson@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(gmailURL, "_blank", "noopener,noreferrer");
};

  return (
    <section className="page-shell contact">
      <motion.div className="contact__panel reconstruct" initial={{ opacity: 0, y: 40, filter: "blur(18px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}>
        <div className="contact__copy">
          <p className="eyebrow">Hiring channel</p>
          <h1><ShuffleText text="Let's get" delay={120} /><strong className="hero-lastname"><ShuffleText text=" in touch." delay={120} /></strong></h1>
          <p>
         Hiring for an AI or full-stack role or building something that needs a developer? 
         Tell me what you're working on and I'll get right back to you.⚡
          </p>
<div className="contact__links">
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=kennykrichardson@gmail.com"
    target="_blank"
    rel="noopener_noreferrer"
    aria-label="Email"
  >
    <img src={Email} alt="" />
  </a>

  <a
    href="https://github.com/kennykrichardson"
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub"
  >
    <img src={GitHub} alt="" />
  </a>

  <a
    href="https://www.linkedin.com/in/kenny-richardson-kodipally-250501217/"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
  >
    <img src={LinkedIn} alt="" />
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
    icon="mail"
    variant="ghost"
    type="button"
    onClick={handleEmail}
  >
    Email
  </MagneticButton>
  
  <MagneticButton
    icon="send"
    type="button"
    onClick={handleWhatsApp}
  >
    WhatsApp
  </MagneticButton>
</div>
        </form>
      </motion.div>
    </section>
  );
}
