import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CloseIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="#F7F5FB"
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
  </Svg>
)
export default CloseIcon
