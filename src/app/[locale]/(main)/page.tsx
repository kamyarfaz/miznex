import {
  CategorySection,
  HeroSection,
  StatsSection,
  HowItWorks,
  Grow,
  WhyMiznex,
  Statistics,
  FAQ,
} from "@/components/main/Landing";
import HeroBackground from "@/components/main/Landing/HeroSection/HeroBackground";
import Navbar from "@/components/shared/Header";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative" id="home">
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
