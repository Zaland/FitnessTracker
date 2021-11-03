import { useEffect, Suspense } from "react"
import { useSession, Routes, useRouter } from "blitz"
import UnauthorizedLayout from "app/core/layouts/UnauthorizedLayout"
import { Loader } from "app/core/components/Loader"

const Route = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
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
    <Suspense fallback={Loader}>
      <Route />
    </Suspense>
  )
}

MainPage.suppressFirstRenderFlicker = true
MainPage.getLayout = (page) => <UnauthorizedLayout title="Main">{page}</UnauthorizedLayout>

export default MainPage
