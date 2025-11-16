import * as React from "react";
import { SVGProps } from "react";
const DiagramUpSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#27B365"
      strokeLinecap="round"
      strokeWidth={2}
      d="M22 22H12c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12V2"
      opacity={0.5}
    />
    <path
      stroke="#27B365"
      strokeLinecap="round"
      strokeWidth={2}
      d="m19 7-3.118 3.926c-.477.602-.716.903-.99 1.05a1.5 1.5 0 0 1-1.357.029c-.28-.135-.531-.425-1.035-1.005-.503-.58-.755-.87-1.035-1.005a1.5 1.5 0 0 0-1.356.03c-.274.146-.513.447-.99 1.048L6 15"
    />
  </svg>
);
export default DiagramUpSVG;
