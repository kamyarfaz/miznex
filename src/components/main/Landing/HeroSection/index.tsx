import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[947px] flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="relative z-10 w-screen 2xl:-left-[4%] max-2xl:container px-4 max-2xl:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
