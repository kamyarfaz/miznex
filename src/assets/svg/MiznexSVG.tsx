import * as React from "react"
import { SVGProps } from "react"
const MiznexSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    {...props}
  >
    <rect width={35} height={35} fill="#FF5B35" rx={5} />
    <path
      fill="#fff"
      d="M9.264 9.455h3.793l4.005 9.772h.171l4.006-9.772h3.792V24h-2.983v-9.467h-.12l-3.765 9.396h-2.03l-3.765-9.432h-.12V24H9.263V9.455Z"
    />
  </svg>
)
export default MiznexSVG
