import { Suspense } from "react"
import { BlitzPage, Routes } from "blitz"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"
import { ProfileForm } from "app/core/components/ProfileForm"
import { Loader } from "app/core/components/Loader"

const ProfilePage: BlitzPage = () => {
  return (
    <Suspense fallback={<Loader top="50%" left="55%" />}>
      <ProfileForm />
    </Suspense>
  )
}

ProfilePage.authenticate = { redirectTo: Routes.LoginPage() }
ProfilePage.getLayout = (page) => <AuthorizedLayout title="Profile">{page}</AuthorizedLayout>

export default ProfilePage
