import Layout, { LayoutProps } from "app/core/layouts/Layout"
import { Navbar } from "app/core/components/Navbar/Navbar"

const AuthorizedLayout = ({ title, children }: LayoutProps) => {
  return (
    <Layout title={title}>
      <Navbar>{children}</Navbar>
    </Layout>
  )
}

export default AuthorizedLayout
