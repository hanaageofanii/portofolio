import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, Lightformer } from "@react-three/drei";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Band from "../three/Band";

gsap.registerPlugin(GSAPSplitText, ScrollTrigger, useGSAP);

/* ================= SPLIT TEXT ================= */
function SplitText({
  text,
  className = "",
  delay = 0.08,
  duration = 0.6,
  ease = "power3.out",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const split = new GSAPSplitText(el, {
        type: "chars",
        charsClass: "char",
      });

      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: delay,
          duration,
          ease,
          immediateRender: false, // 🔥 INI FIX NGE-BLANK
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "restart none restart none",
          },
        }
      );

      return () => {
        split.revert();
      };
    },
    { scope: ref }
  );

  return (
    <h1
      ref={ref}
      className={`pointer-events-none select-none leading-none text-center ${className}`}>
      {text}
    </h1>
  );
}

/* ================= HERO ================= */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-screen h-screen overflow-hidden bg-[#1A3D64]">
      {/* TEXT */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <SplitText
          text="PORTOFOLIO"
          className="
            text-[#F4F4F4] font-bold drop-shadow
            tracking-[4px] sm:tracking-[6px] md:tracking-[10px]
            text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px]
          "
        />
      </div>

      {/* THREE */}
      <Canvas
        camera={{ position: [0, 0, 12], fov: 25 }}
        className="relative z-20">
        <ambientLight intensity={Math.PI} />

        <Physics gravity={[0, -40, 0]}>
          <Band />
        </Physics>

        <Environment blur={0.7}>
          <Lightformer
            intensity={2}
            position={[-10, 0, 14]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </section>
  );
}
