import { useRouter, BlitzPage, Routes } from "blitz"
import CenteredLayout from "app/core/layouts/CenteredLayout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <CenteredLayout title="Sign Up">{page}</CenteredLayout>

export default SignupPage
