import * as React from "react"
import { SVGProps } from "react"
const LinkedinSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="#444955"
      d="M20.376 0H1.624A1.624 1.624 0 0 0 0 1.624v18.752A1.624 1.624 0 0 0 1.624 22h18.752A1.624 1.624 0 0 0 22 20.376V1.624A1.624 1.624 0 0 0 20.376 0ZM6.557 18.741H3.25V8.235h3.307V18.74ZM4.901 6.78a1.899 1.899 0 1 1 1.91-1.898A1.872 1.872 0 0 1 4.9 6.78ZM18.75 18.75h-3.306v-5.74c0-1.692-.72-2.215-1.649-2.215-.98 0-1.943.74-1.943 2.258v5.697H8.543V8.242h3.181v1.456h.043c.32-.646 1.438-1.75 3.144-1.75 1.846 0 3.84 1.095 3.84 4.303l-.002 6.5Z"
    />
  </svg>
)
export default LinkedinSVG
