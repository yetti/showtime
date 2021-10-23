import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCollection from "app/collections/queries/getCollection"
import deleteCollection from "app/collections/mutations/deleteCollection"

export const Collection = () => {
  const router = useRouter()
  const collectionId = useParam("collectionId", "number")
  const [deleteCollectionMutation] = useMutation(deleteCollection)
  const [collection] = useQuery(getCollection, { id: collectionId })

  return (
    <>
      <Head>
        <title>Collection {collection.id}</title>
      </Head>

      <div>
        <h1>Collection {collection.id}</h1>
        <pre>{JSON.stringify(collection, null, 2)}</pre>

        <Link href={Routes.EditCollectionPage({ collectionId: collection.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCollectionMutation({ id: collection.id })
              router.push(Routes.CollectionsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCollectionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CollectionsPage()}>
          <a>Collections</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Collection />
      </Suspense>
    </div>
  )
}

ShowCollectionPage.authenticate = true
ShowCollectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCollectionPage
