import { BlitzPage, Routes } from "blitz"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"

const ProfilePage: BlitzPage = () => {
  return <div>This is profile page!</div>
}

ProfilePage.authenticate = { redirectTo: Routes.LoginPage() }
ProfilePage.getLayout = (page) => <AuthorizedLayout title="Profile">{page}</AuthorizedLayout>

export default ProfilePage
