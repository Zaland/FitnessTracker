import { BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"

const HomePage: BlitzPage = () => {
  return <div>test</div>
}

HomePage.authenticate = { redirectTo: Routes.LoginPage() }
HomePage.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default HomePage
