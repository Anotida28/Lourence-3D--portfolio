import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import GitHubStats from "./sections/GitHubStats";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import ScrollProgress from "./components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // Blur-fade reveal for any element tagged with data-reveal.
  // Optional data-reveal-delay staggers siblings.
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      // Suspend CSS transitions so they don't fight the tween,
      // then clear inline styles so hover transforms work again.
      el.style.transition = "none";

      gsap.fromTo(
        el,
        { y: 36, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          delay: parseFloat(el.dataset.revealDelay || 0),
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onComplete: () => {
            gsap.set(el, { clearProps: "transform,opacity,filter" });
            el.style.removeProperty("transition");
          },
        }
      );
    });
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <FeatureCards />
      <Experience />
      <TechStack />
      <GitHubStats />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
