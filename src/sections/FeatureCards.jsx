import { abilities } from "../constants";

const FeatureCards = () => (
  <div className="w-full padding-x-lg">
    <div className="mx-auto grid-3-cols">
      {abilities.map(({ imgPath, title, desc }, index) => (
        <div
          key={title}
          data-reveal
          data-reveal-delay={index * 0.12}
          className="card-border rounded-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-50/40 hover:shadow-[0_10px_40px_-12px_rgba(26,111,181,0.35)]"
        >
          <div className="size-14 flex items-center justify-center rounded-full">
            <img src={imgPath} alt={title} />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-white-50 text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
