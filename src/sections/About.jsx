import React, { useEffect, useState } from "react";
import { Camera, Palette, Aperture, Layers, Grid, PenTool } from "lucide-react";
import ScrollVelocity from "../components/ScrollVelocity";

export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  const skills = [
    "Photography",
    "Photo Editing",
    "Digital Illustration",
    "Video Editing",
    "Typography",
    "Creative Direction",
  ];

  const tools = [
    { name: "Photoshop", icon: PenTool },
    { name: "Lightroom", icon: Camera },
    { name: "Illustrator", icon: Aperture },
    { name: "Canva", icon: Palette },
    { name: "Adobe XD", icon: Layers },
    { name: "CapCut", icon: Grid },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-[#1A3D64] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Moving Title */}
      <ScrollVelocity
        texts={["ABOUT ME ✦ CREATIVE DESIGN ✦ VISUAL STORY ✦"]}
        velocity={25}
        className="text-white font-semibold text-3xl md:text-4xl mb-16 tracking-widest"
      />

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full items-stretch relative z-10">
        {/* LEFT CARD */}
        <div
          className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
          p-8 flex flex-col justify-between
          transition-all duration-700 ease-out
          hover:-translate-y-2 hover:shadow-2xl
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-6 h-6 text-white transition-transform duration-500 hover:rotate-6 hover:scale-110" />
              <h2 className="text-2xl font-semibold text-white">About Me</h2>
            </div>

            <p className="text-white/80 text-sm leading-relaxed mb-8">
              I enjoy capturing moments through photography and transforming
              ideas into meaningful visuals through thoughtful design. My focus
              is on clarity, emotion, and consistency in every project.
            </p>

            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Core Skills
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="text-xs text-white/90 px-3 py-2 rounded-lg
                  border border-white/15 bg-white/5 text-center
                  transition-all duration-300
                  hover:bg-white/10 hover:-translate-y-0.5">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xs text-white/40 tracking-widest text-center animate-fade">
            CREATIVE PROFILE
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
          p-8 flex flex-col justify-between
          transition-all duration-700 ease-out
          hover:-translate-y-2 hover:shadow-2xl
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Grid className="w-6 h-6 text-white transition-transform duration-500 hover:rotate-6 hover:scale-110" />
              <h2 className="text-2xl font-semibold text-white">
                Tools & Software
              </h2>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-8">
              A curated set of tools I use to build efficient, consistent, and
              visually refined creative outputs.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-2
                    p-4 rounded-xl border border-white/15 bg-white/5
                    transition-all duration-300
                    hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg">
                    <Icon className="w-5 h-5 text-white transition-transform duration-300 hover:scale-110" />
                    <span className="text-xs text-white/90">{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 text-xs text-white/40 tracking-widest text-center animate-fade">
            DAILY TOOLSET
          </div>
        </div>
      </div>

      {/* Extra Animation */}
      <style jsx>{`
        @keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade {
          animation: fade 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
