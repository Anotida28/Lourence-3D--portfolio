import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #1a2e50 0%, #080f1e 65%)" }}>
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" /> 
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center xl:w-1/2 w-full">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <div className="flex flex-col gap-2 max-w-lg relative z-10 pointer-events-none">
              <p className="text-white-50 md:text-xl">
                Hi, I’m Lourence Ruhwaya — a full-stack developer and CS student at NUST Zimbabwe, building web apps, AI tools, and cloud systems.
              </p>
              <p className="text-white-50 md:text-xl">
                Passionate about cybersecurity and crafting software that solves real problems.
              </p>
            </div>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model - Glass Container */}
        <div className="hero-3d-container">
          <HeroExperience />
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
