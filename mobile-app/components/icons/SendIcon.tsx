import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SendIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="#084887"
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
  </Svg>
)
export default SendIcon
