import { ReactNode } from "react"
import { Head } from "blitz"
import { CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

export type LayoutProps = {
  title?: string
  children: ReactNode
}

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 13,
  },
  palette: {
    primary: {
      dark: "#001970",
      main: "#303F9F",
      light: "#666AD1",
    },
    secondary: {
      dark: "#004B70",
      main: "#30779F",
      light: "#66A6D0",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default Layout
