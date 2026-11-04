import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const LiveChip = () => (
  <span className="live-chip">
    <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
    View Live
    <span aria-hidden="true">↗</span>
  </span>
);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <TitleHeader title="Featured Client Projects" />
        <div className="showcaselayout">
          <a
            href="https://libratech-2-0.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            ref={rydeRef}
            className="first-project-wrapper"
          >
            <div className="image-wrapper">
              <img src="/images/libratech-shot.png" alt="Libratech Electrical" />
              <LiveChip />
            </div>
            <div className="text-content">
              <h2>
                Libratech Electrical — Contracting &amp; Retail Site
              </h2>
              <p className="text-white-50 md:text-xl">
                A business website for a Gweru-based electrical contractor and retailer covering residential, commercial, agricultural, and powerline work, with quote requests and WhatsApp integration.
              </p>
            </div>
          </a>

          <div className="project-list-wrapper">
            <a
              href="https://saint-prince-juz6.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="project"
              ref={libraryRef}
            >
              <div className="image-wrapper">
                <img
                  src="/images/saint-prince-shot.png"
                  alt="Saint Prince — Rotating Equipment & Heat Exchanger Engineering"
                />
                <LiveChip />
              </div>
              <h2>Saint Prince — Turbine, Pump &amp; Heat Exchanger Engineering</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
