import { ReactNode } from "react"
import { Head } from "blitz"
import HeaderNav from "../components/HeaderNav"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} - Showtime` || "Showtime"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav />
      {children}
    </>
  )
}

export default Layout
