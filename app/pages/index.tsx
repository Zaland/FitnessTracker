import { useEffect, Suspense } from "react"
import { useSession, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"

const Route = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    console.log({ session })
    if (session.userId) {
      router.push(Routes.HomePage())
    } else {
      router.push(Routes.LoginPage())
    }
  })

  return <div />
}

const MainPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Route />
    </Suspense>
  )
}

MainPage.suppressFirstRenderFlicker = true
MainPage.getLayout = (page) => <Layout title="Main">{page}</Layout>

export default MainPage
