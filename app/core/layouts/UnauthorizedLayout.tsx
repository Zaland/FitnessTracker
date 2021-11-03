import { useEffect, useState } from "react"
import Layout, { LayoutProps } from "app/core/layouts/Layout"

const UnauthorizedLayout = ({ title, children }: LayoutProps) => {
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

  return (
    <Layout title={title} darkMode={darkMode}>
      {children}
    </Layout>
  )
}

export default UnauthorizedLayout
