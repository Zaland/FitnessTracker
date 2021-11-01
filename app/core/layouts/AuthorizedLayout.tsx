import { useState } from "react"
import Layout, { LayoutProps } from "app/core/layouts/Layout"
import { Navbar } from "app/core/components/Navbar/Navbar"

const AuthorizedLayout = ({ title, children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(false)

  const handleThemeChange = () => setDarkMode(!darkMode)

  return (
    <Layout title={title} darkMode={darkMode}>
      <Navbar darkMode={darkMode} onThemeChange={handleThemeChange}>
        {children}
      </Navbar>
    </Layout>
  )
}

export default AuthorizedLayout
