"use client";
import Union2SVG from "@/assets/svg/Union2SVG";
import UnionSVG from "@/assets/svg/UnionSVG";

const HeroBackground = () => {
  return (
    <>
    <div className="absolute left-0 top-0">
      <UnionSVG />
    </div>
    <div className="absolute right-0 top-0 scale-x-[-1]">
      <Union2SVG />
    </div>
    </>
  );
};

export default HeroBackground;
