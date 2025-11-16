import * as React from "react"
import { SVGProps } from "react"
const XSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={19}
    fill="none"
    {...props}
  >
    <path
      fill="#444955"
      d="M15.882 0h3.093l-6.756 7.722 7.948 10.507h-6.223L9.07 11.856 3.492 18.23H.398l7.226-8.26L0 0h6.381l4.406 5.825L15.882 0Zm-1.085 16.378h1.714L5.45 1.754H3.611l11.186 14.624Z"
    />
  </svg>
)
export default XSVG
