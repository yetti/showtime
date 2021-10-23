import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCollections from "app/collections/queries/getCollections"

const ITEMS_PER_PAGE = 100

export const CollectionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ collections, hasMore }] = usePaginatedQuery(getCollections, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link href={Routes.ShowCollectionPage({ collectionId: collection.id })}>
              <a>{collection.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CollectionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Collections</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCollectionPage()}>
            <a>Create Collection</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CollectionsList />
        </Suspense>
      </div>
    </>
  )
}

CollectionsPage.authenticate = true
CollectionsPage.getLayout = (page) => <Layout title="Collections">{page}</Layout>

export default CollectionsPage
