import { SvgIcon, SvgIconProps } from "@mui/material"

export const ProfileCircle = (props: SvgIconProps) => (
  <SvgIcon {...props} sx={{ fill: "transparent", ...props.sx }}>
    <path
      d="M14.9405 8.04047C15.1605 8.48047 15.2905 8.98047 15.2905 9.51047C15.2805 11.2805 13.8905 12.7305 12.1305 12.7805C12.0605 12.7705 11.9705 12.7705 11.8905 12.7805C10.1305 12.7205 8.73047 11.2805 8.73047 9.51047C8.73047 7.70047 10.1905 6.23047 12.0105 6.23047"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.7417 19.3786C16.9617 21.0086 14.6017 21.9986 12.0017 21.9986C9.40172 21.9986 7.04172 21.0086 5.26172 19.3786C5.36172 18.4386 5.96172 17.5186 7.03172 16.7986C9.77172 14.9786 14.2517 14.9786 16.9717 16.7986C18.0417 17.5186 18.6417 18.4386 18.7417 19.3786Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
