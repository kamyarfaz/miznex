import {
  CategorySection,
  HeroSection,
  StatsSection,
  HowItWorks,
  Grow,
  WhyMiznex,
  Statistics,
  FAQ
} from "@/components/main/Landing";
import HeroBackground from "@/components/main/Landing/HeroSection/HeroBackground";

export default function Home() {
  return (
    <>
      <div className="relative opacity-0" id="home">
        <HeroBackground />
      </div>
      <HeroSection />
      <div className="container px-4 mx-auto max-lg:max-w-full max-lg:box-border">
        <CategorySection />
        <StatsSection />
        <HowItWorks />
        <Grow />
        <WhyMiznex />
        <Statistics />
        <FAQ />
      </div>
    </>
  );
}
