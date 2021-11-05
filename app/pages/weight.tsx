import { Suspense } from "react"
import { BlitzPage, Routes } from "blitz"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"
import { Loader } from "app/core/components/Loader"

const WeightPage: BlitzPage = () => {
  return <Suspense fallback={<Loader top="50%" left="55%" />}>This is the weight page</Suspense>
}

WeightPage.authenticate = { redirectTo: Routes.LoginPage() }
WeightPage.getLayout = (page) => <AuthorizedLayout title="Weight">{page}</AuthorizedLayout>

export default WeightPage
