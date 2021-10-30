import { SvgIcon, SvgIconProps } from "@mui/material"

export const ArrowLeft = (props: SvgIconProps) => (
  <SvgIcon {...props} sx={{ fill: "transparent", ...props.sx }}>
    <path
      d="M12.7803 6.30919C15.6503 4.65919 18.0003 6.00919 18.0003 9.32919V11.9992V14.6692C18.0003 17.9792 15.6503 19.3392 12.7803 17.6792L10.4703 16.3392L8.16031 14.9992C5.29031 13.3392 5.29031 10.6292 8.16031 8.96919"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
