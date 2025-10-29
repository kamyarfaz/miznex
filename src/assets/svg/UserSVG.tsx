import * as React from "react";
import { SVGProps } from "react";
const UserSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <circle cx={14} cy={7} r={4.667} fill="#fff" />
    <path
      fill="#fff"
      d="M23.333 20.417c0 2.9 0 5.25-9.333 5.25s-9.333-2.35-9.333-5.25 4.178-5.25 9.333-5.25 9.333 2.35 9.333 5.25Z"
    />
  </svg>
);
export default UserSVG;
