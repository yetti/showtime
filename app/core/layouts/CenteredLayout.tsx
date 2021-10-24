import { ReactNode } from "react"
import { Head } from "blitz"
import HeaderNav from "../components/HeaderNav"
import { Box, Flex, useColorModeValue } from "@chakra-ui/react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const CenteredLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} - Showtime` || "Showtime"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav />
      <Box>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          {children}
        </Flex>
      </Box>
    </>
  )
}

export default CenteredLayout
