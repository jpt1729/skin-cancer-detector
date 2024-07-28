import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"
const SelectIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <Circle cx={6} cy={6} r={5.5} stroke="#000" />
  </Svg>
)
export default SelectIcon
