import TitleHeader from "../components/TitleHeader";
import LogoShowcase from "./LogoShowcase";

const TechStack = () => {
  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full">
        <div className="md:px-10 px-5">
          <TitleHeader
            title="How I Can Contribute & My Key Skills"
            sub=""
          />
        </div>
        <LogoShowcase />
      </div>
    </div>
  );
};

export default TechStack;
