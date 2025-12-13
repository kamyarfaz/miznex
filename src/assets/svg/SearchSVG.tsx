import * as React from "react";
import { SVGProps } from "react";
const SearchSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <circle cx={9.583} cy={9.583} r={7.917} stroke="#fff" />
    <path stroke="#fff" strokeLinecap="round" d="m15.416 15.417 2.917 2.916" />
  </svg>
);
export default SearchSVG;
