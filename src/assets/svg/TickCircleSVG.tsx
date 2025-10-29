import * as React from "react";
import { SVGProps } from "react";
const TickCircleSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#444955"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 18.333c4.583 0 8.333-3.75 8.333-8.333S14.583 1.667 10 1.667 1.667 5.417 1.667 10s3.75 8.333 8.333 8.333Z"
    />
    <path
      stroke="#444955"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6.458 10 2.359 2.358 4.725-4.716"
    />
  </svg>
);
export default TickCircleSVG;
