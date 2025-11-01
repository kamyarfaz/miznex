import * as React from "react";
import { SVGProps } from "react";
const TelegramSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#444955"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.226 11.043c-.949.888.13 1.894 1.223 2.702 1.91 1.354 3.805 2.729 5.71 4.089.715.498 1.891.934 2.241-.196l3.355-14.78c.147-.618.251-1.29-.33-1.728-.323-.25-.907-.586-1.985-.214L1.49 7.9c-1.092.475-.787 1.591-.282 1.777 1.24.47 2.92 1.169 4.163 1.63 1.271.437 2.778.415 3.855-.265Zm0 0 5.673-3.726"
    />
  </svg>
);
export default TelegramSVG;
