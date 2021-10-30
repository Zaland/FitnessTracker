import { SvgIcon, SvgIconProps } from "@mui/material"

export const Menu = (props: SvgIconProps) => (
  <SvgIcon {...props} sx={{ fill: "transparent", ...props.sx }}>
    <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9.49023 12H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 12H5.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 17H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SvgIcon>
)
