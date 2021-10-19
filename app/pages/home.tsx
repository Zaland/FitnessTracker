import { BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import Navbar from "app/core/components/Navbar"

const HomePage: BlitzPage = () => {
  return <Navbar />
}

HomePage.authenticate = { redirectTo: Routes.LoginPage() }
HomePage.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default HomePage
