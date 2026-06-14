import { certifications } from "../constants";
import TitleHeader from "../components/TitleHeader";

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Certifications"
          sub="🏅 Verified credentials from Credly"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="card-border rounded-xl p-6 flex gap-5 items-start hover:border-white-50 transition-colors duration-300"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
