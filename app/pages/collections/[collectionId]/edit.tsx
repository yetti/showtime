import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCollection from "app/collections/queries/getCollection"
import updateCollection from "app/collections/mutations/updateCollection"
import { CollectionForm, FORM_ERROR } from "app/collections/components/CollectionForm"

export const EditCollection = () => {
  const router = useRouter()
  const collectionId = useParam("collectionId", "number")
  const [collection, { setQueryData }] = useQuery(
    getCollection,
    { id: collectionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCollectionMutation] = useMutation(updateCollection)

  return (
    <>
      <Head>
        <title>Edit Collection {collection.id}</title>
      </Head>

      <div>
        <h1>Edit Collection {collection.id}</h1>
        <pre>{JSON.stringify(collection, null, 2)}</pre>

        <CollectionForm
          submitText="Update Collection"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCollection}
          initialValues={collection}
          onSubmit={async (values) => {
            try {
              const updated = await updateCollectionMutation({
                id: collection.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCollectionPage({ collectionId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCollectionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCollection />
      </Suspense>

      <p>
        <Link href={Routes.CollectionsPage()}>
          <a>Collections</a>
        </Link>
      </p>
    </div>
  )
}

EditCollectionPage.authenticate = true
EditCollectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCollectionPage
