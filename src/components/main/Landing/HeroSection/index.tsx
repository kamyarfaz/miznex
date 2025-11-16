import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[947px] flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 w-screen rtl:2xl:-left-[4%] ltr:2xl:-right-[6%] max-2xl:container px-4 max-2xl:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
