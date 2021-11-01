import { SvgIcon, SvgIconProps } from "@mui/material"

export const Moon = (props: SvgIconProps) => (
  <SvgIcon {...props} sx={{ fill: "transparent", ...props.sx }}>
    <path
      d="M4.18073 5.37996C2.67073 7.29996 1.84073 9.75996 2.03073 12.42C2.39073 17.57 6.76073 21.76 11.9907 21.99C15.6807 22.15 18.9807 20.43 20.9607 17.72C21.7807 16.61 21.3407 15.87 19.9707 16.12C19.3007 16.24 18.6107 16.29 17.8907 16.26C13.0007 16.06 9.00073 11.97 8.98073 7.13996C8.97073 5.83996 9.24073 4.60996 9.73073 3.48996C10.2707 2.24996 9.62073 1.65996 8.37073 2.18996"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
