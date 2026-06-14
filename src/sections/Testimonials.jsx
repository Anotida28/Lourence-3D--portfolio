import { useState, useEffect } from "react";
import { certifications } from "../constants";
import TitleHeader from "../components/TitleHeader";

const Testimonials = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Certifications"
          sub=""
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {certifications.map((cert, index) => (
            <button
              key={index}
              onClick={() => setSelected(cert)}
              className="card-border rounded-xl p-6 flex gap-5 items-start hover:border-white-50 transition-all duration-300 hover:scale-[1.02] text-left w-full cursor-pointer"
            >
              <img
                src={cert.imgPath}
                alt={cert.name}
                className="w-20 h-20 object-contain flex-none rounded-lg"
              />
              <div className="flex flex-col gap-2 min-w-0">
                <p className="font-semibold text-base leading-snug">{cert.name}</p>
                <p className="text-blue-50 text-sm">{cert.issuer}</p>
                <p className="text-white-50 text-xs">Issued {cert.date}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cert.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-black-200 text-white-50 border border-black-50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-5"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-black-100 border border-black-50 rounded-2xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white-50 hover:text-white text-2xl leading-none"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Badge + header */}
            <div className="flex gap-5 items-center mb-6">
              <img
                src={selected.imgPath}
                alt={selected.name}
                className="w-24 h-24 object-contain flex-none rounded-xl"
              />
              <div>
                <h2 className="font-bold text-xl leading-snug">{selected.name}</h2>
                <p className="text-blue-50 text-sm mt-1">{selected.issuer}</p>
                <p className="text-white-50 text-xs mt-1">Issued {selected.date}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-[#839CB5] text-sm uppercase tracking-wider mb-2 font-semibold">About</p>
              <p className="text-white-50 text-base leading-relaxed">{selected.description}</p>
            </div>

            {/* Skills */}
            <div>
              <p className="text-[#839CB5] text-sm uppercase tracking-wider mb-3 font-semibold">Skills Learned</p>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 rounded-full bg-black-200 text-white-50 border border-black-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
