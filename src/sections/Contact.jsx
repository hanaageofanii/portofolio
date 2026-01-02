// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaWhatsapp,
  FaExternalLinkAlt,
  FaTiktok,
} from "react-icons/fa";
import TextPressure from "../components/TextPressure";

/* ================= CONTACT CARD ================= */
// eslint-disable-next-line no-unused-vars
const ContactCard = ({ icon: Icon, title, value, action, color }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (action) {
      window.open(action, "_blank");
    } else {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        group cursor-pointer
        rounded-2xl p-[1px]
        bg-gradient-to-br from-white/20 via-white/5 to-white/10
        hover:from-white/30 hover:to-white/20
        transition-all duration-500
        hover:scale-[1.03]
      ">
      <div
        className="
          relative rounded-2xl p-6
          bg-white/5 backdrop-blur-xl
          border border-white/10
          h-full
        ">
        {/* glow */}
        <div
          className="absolute -right-12 -bottom-12 w-40 h-40 blur-3xl rounded-full opacity-40"
          style={{ background: color }}
        />

        <div className="relative flex items-center gap-4">
          <div
            className="p-3 rounded-xl text-white"
            style={{ background: color }}>
            <Icon size={22} />
          </div>

          <div className="flex-1">
            <p className="text-xs tracking-widest text-gray-400 uppercase">
              {title}
            </p>
            <p className="text-white font-semibold truncate">{value}</p>
          </div>

          <div className="text-gray-400 group-hover:text-white transition">
            {action ? (
              <FaExternalLinkAlt />
            ) : copied ? (
              <FaCheck className="text-green-400" />
            ) : (
              <FaCopy />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SOCIAL ICON ================= */
// eslint-disable-next-line no-unused-vars
const SocialLink = ({ icon: Icon, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      group relative w-14 h-14
      flex items-center justify-center
      rounded-full
      bg-white/5 backdrop-blur
      border border-white/10
      transition-all duration-500
      hover:scale-125 hover:-translate-y-2
    ">
    <div
      className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition"
      style={{ background: color }}
    />
    <Icon className="relative z-10 text-white" size={22} />
  </a>
);

/* ================= MAIN ================= */
export default function Contact() {
  const contacts = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "test@gmail.com",
      color: "#EF4444",
    },
    {
      icon: FaInstagram,
      title: "Instagram",
      value: "@test",
      action: "https://instagram.com/muidzotunavissa",
      color: "#E1306C",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "+62 859-1234-0988",
      action: "https://wa.me/628512340988",
      color: "#25D366",
    },
  ];

  const socials = [
    {
      icon: FaTiktok,
      href: "https://tiktok.com/@muidzotunavissa",
      color: "#000",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/muidzotunavissa",
      color: "#E1306C",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/muidzotunavissa",
      color: "#0077B5",
    },
    {
      icon: FaYoutube,
      href: "https://youtube.com/@muidzotunavissa",
      color: "#FF0000",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#1A3D64] py-32 overflow-hidden">
      {/* background blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-400/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500/20 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="relative h-[120px] max-w-4xl mx-auto">
            <TextPressure
              text="LET’S CONNECT"
              flex
              width
              weight
              italic
              alpha={false}
              stroke={false}
              textColor="#ffffff"
              minFontSize={48}
            />
          </div>

          <p className="mt-2 text-gray-300 text-sm max-w-md mx-auto">
            Open for collaboration, freelance projects, or just a friendly chat.
          </p>
        </header>

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contacts.map((item, i) => (
            <ContactCard key={i} {...item} />
          ))}
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-400 text-xs tracking-widest uppercase">
            find me on
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* SOCIAL */}
        <div className="flex justify-center gap-6 mb-12">
          {socials.map((item, i) => (
            <SocialLink key={i} {...item} />
          ))}
        </div>

        {/* FOOTER */}
        <div className="text-center text-gray-300 text-sm">
          Let’s build something meaningful ✨
        </div>
      </div>
    </section>
  );
}
