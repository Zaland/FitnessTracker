import { useEffect, useState } from "react"
import Layout, { LayoutProps } from "app/core/layouts/Layout"
import { Navbar } from "app/core/components/Navbar/Navbar"

const AuthorizedLayout = ({ title, children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const currentDarkMode =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("darkMode") || "false")
        : false

    if (currentDarkMode) {
      setDarkMode(true)
    }
  }, [])

  const handleThemeChange = () => {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode))
    setDarkMode(!darkMode)
  }

  return (
    <Layout title={title}>
      <Navbar darkMode={darkMode} onThemeChange={handleThemeChange}>
        {children}
      </Navbar>
    </Layout>
  )
}

export default AuthorizedLayout
