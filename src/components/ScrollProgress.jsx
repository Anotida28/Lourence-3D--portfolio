import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
};

export default ScrollProgress;
