import { ReactNode } from "react"
import { Head } from "blitz"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { generateTheme } from "./theme"

export type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const darkMode =
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("darkMode") || "false") : false
  const theme = generateTheme(darkMode)

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
