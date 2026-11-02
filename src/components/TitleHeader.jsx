const TitleHeader = ({ title }) => {
  return (
    <div className="flex flex-col items-center gap-5" data-reveal>
      <h1 className="font-semibold md:text-5xl text-3xl text-center">
        {title}
      </h1>
    </div>
  );
};

export default TitleHeader;
