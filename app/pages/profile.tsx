import { Suspense } from "react"
import { BlitzPage, Routes } from "blitz"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"
import { ProfileForm } from "app/core/components/ProfileForm"

const ProfilePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <ProfileForm />
    </Suspense>
  )
}

ProfilePage.authenticate = { redirectTo: Routes.LoginPage() }
ProfilePage.getLayout = (page) => <AuthorizedLayout title="Profile">{page}</AuthorizedLayout>

export default ProfilePage
