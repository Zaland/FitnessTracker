import { BlitzPage, Routes } from "blitz"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"

const HomePage: BlitzPage = () => {
  return <div>This is home page!</div>
}

HomePage.authenticate = { redirectTo: Routes.LoginPage() }
HomePage.getLayout = (page) => <AuthorizedLayout title="Home">{page}</AuthorizedLayout>

export default HomePage
