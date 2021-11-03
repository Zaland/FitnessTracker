import { useRouter, BlitzPage, Routes } from "blitz"
import UnauthorizedLayout from "app/core/layouts/UnauthorizedLayout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.HomePage())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <UnauthorizedLayout title="Signup">{page}</UnauthorizedLayout>

export default SignupPage
