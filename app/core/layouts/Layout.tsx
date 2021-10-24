import { ReactNode } from "react"
import { Head } from "blitz"
import { CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

export type LayoutProps = {
  title?: string
  children: ReactNode
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#008AF1",
    },
    secondary: {
      main: "#F16800",
    },
    background: {
      default: "#DADADA",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          fontWeight: 600,
        },
      },
    },
  },
})

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "FitnessTracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default Layout
