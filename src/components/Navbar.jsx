import { useState, useEffect } from "react";

const sections = ["hero", "about", "projects", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (id) =>
    `relative cursor-pointer transition ${
      active === id
        ? "opacity-100 after:w-full after:bg-white"
        : "opacity-70 hover:opacity-100 after:w-0 hover:after:w-full"
    }
    after:absolute after:left-0 after:-bottom-1 after:h-px after:transition-all after:duration-300`;

  return (
    <nav className="fixed top-0 left-0 w-full h-16 px-4 md:px-12 flex items-center justify-between md:justify-center z-50 text-white bg-transparent animate-nav-in">
      {/* DESKTOP */}
      <div className="hidden md:flex gap-8 text-sm tracking-wide">
        <span className={linkClass("hero")} onClick={() => scrollTo("hero")}>
          Home
        </span>
        <span className={linkClass("about")} onClick={() => scrollTo("about")}>
          About Me
        </span>
        <span
          className={linkClass("projects")}
          onClick={() => scrollTo("projects")}>
          My Project
        </span>
        <span
          className={linkClass("contact")}
          onClick={() => scrollTo("contact")}>
          Contact
        </span>
      </div>

      {/* HAMBURGER */}
      <div
        className="flex md:hidden flex-col gap-1.5 cursor-pointer z-50"
        onClick={() => setOpen(!open)}>
        <span
          className={`w-6 h-0.5 bg-white transition-transform ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-opacity ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-transform ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#1A3D64]/95 backdrop-blur-md flex flex-col gap-6 py-8 px-6 md:hidden transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}>
        {sections.map((id) => (
          <span key={id} className={linkClass(id)} onClick={() => scrollTo(id)}>
            {id === "hero"
              ? "Home"
              : id === "about"
              ? "About Me"
              : id === "projects"
              ? "My Project"
              : "Contact"}
          </span>
        ))}
      </div>
    </nav>
  );
}
