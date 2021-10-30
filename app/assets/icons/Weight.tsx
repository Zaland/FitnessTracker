import { SvgIcon, SvgIconProps } from "@mui/material"

export const Weight = (props: SvgIconProps) => (
  <SvgIcon {...props} sx={{ fill: "transparent", ...props.sx }}>
    <path
      d="M3 12.98V15C3 20 5 22 10 22H14C19 22 21 20 21 15V9C21 4 19 2 14 2H10C5 2 3 4 3 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.25 8.28992C14.26 5.62992 9.74 5.62992 6.75 8.28992L8.93 11.7899C10.68 10.2299 13.32 10.2299 15.07 11.7899"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
