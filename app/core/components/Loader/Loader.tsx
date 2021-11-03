import { Box, CircularProgress } from "@mui/material"
import { deepPurple } from "@mui/material/colors"

type LoaderProps = {
  top?: string
  left?: string
}

export const Loader = ({ top = "45%", left = "45%" }: LoaderProps) => (
  <Box sx={{ width: "100%", height: "100%" }}>
    <Box sx={{ position: "fixed", top, left }}>
      <CircularProgress size={100} sx={{ color: deepPurple[500] }} />
    </Box>
  </Box>
)
