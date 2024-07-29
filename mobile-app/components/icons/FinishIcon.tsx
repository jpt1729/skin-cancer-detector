import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const FinishIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="#F7F5FB"
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
  </Svg>
)
export default FinishIcon
