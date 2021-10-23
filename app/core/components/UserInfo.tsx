import { Button } from "@chakra-ui/react"
import { useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

export default function UserInfo() {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
        <Button
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          ml={2}
          color={"white"}
          bg={"pink.400"}
          onClick={async () => {
            await logoutMutation()
          }}
          _hover={{
            bg: "pink.300",
          }}
        >
          Logout
        </Button>
      </>
    )
  } else {
    return <></>
  }
}
