import {
  CategorySection,
  HeroSection,
  StatsSection,
  HowItWorks,
  Grow,
  WhyMiznex
} from "@/components/main/Landing";
import HeroBackground from "@/components/main/Landing/HeroSection/HeroBackground";

export default function Home() {
  return (
    <>
      <div className="relative" id="home">
        <HeroBackground />
      </div>
      <HeroSection />
      <div className="container px-4 mx-auto">
        <CategorySection />
        <StatsSection />
        <HowItWorks />
        <Grow />
        <WhyMiznex />
      </div>
    </>
  );
}
