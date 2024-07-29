import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { motifySvg } from 'moti/svg'

const MotifyPath = motifySvg(Path)()
const FlashlightIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <MotifyPath
      fill="#F7F5FB"
      animate={{fill: props.flash === 'on' ? '#FFC000' : '#F7F5FB'}}
      d="M8 20v-9L6.325 8.5a1.685 1.685 0 0 1-.25-.525A2.176 2.176 0 0 1 6 7.4V4c0-.55.196-1.02.588-1.413A1.926 1.926 0 0 1 8 2h8c.55 0 1.02.196 1.413.587C17.803 2.98 18 3.45 18 4v3.4c0 .2-.025.392-.075.575-.05.183-.133.358-.25.525L16 11v9c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0 1 14 22h-4c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 0 1 8 20Zm4-4.5c-.417 0-.77-.146-1.063-.438A1.446 1.446 0 0 1 10.5 14c0-.417.146-.77.438-1.063A1.446 1.446 0 0 1 12 12.5c.417 0 .77.146 1.063.438.291.291.437.645.437 1.062 0 .417-.146.77-.438 1.063A1.446 1.446 0 0 1 12 15.5ZM8 5h8V4H8v1Zm8 2H8v.4l2 3V20h4v-9.6l2-3V7Z"
    />
  </Svg>
)
export default FlashlightIcon
