import { SvgIcon, SvgIconProps } from "@mui/material"

export const Sun = (props: SvgIconProps) => (
  <SvgIcon {...props} sx={{ fill: "transparent", ...props.sx }}>
    <path
      d="M7 7.85C6.06 8.98 5.5 10.42 5.5 12C5.5 15.59 8.41 18.5 12 18.5C15.59 18.5 18.5 15.59 18.5 12C18.5 8.41 15.59 5.5 12 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
