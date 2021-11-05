import { Suspense } from "react"
import { BlitzPage, Routes } from "blitz"
import { Loader } from "app/core/components/Loader"
import { Weight } from "app/core/components/Weight"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"

const WeightPage: BlitzPage = () => {
  return (
    <Suspense fallback={<Loader top="50%" left="55%" />}>
      <Weight />
    </Suspense>
  )
}

WeightPage.authenticate = { redirectTo: Routes.LoginPage() }
WeightPage.getLayout = (page) => <AuthorizedLayout title="Weight">{page}</AuthorizedLayout>

export default WeightPage
