import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"
const SelectedIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <Circle cx={6} cy={6} r={3} fill="#F58A07" />
    <Circle cx={6} cy={6} r={5.5} stroke="#F58A07" />
  </Svg>
)
export default SelectedIcon
