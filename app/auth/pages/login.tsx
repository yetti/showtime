import { useRouter, BlitzPage } from "blitz"
import CenteredLayout from "app/core/layouts/CenteredLayout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <CenteredLayout title="Log In">{page}</CenteredLayout>

export default LoginPage
