import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCollection from "app/collections/mutations/createCollection"
import { CollectionForm, FORM_ERROR } from "app/collections/components/CollectionForm"

const NewCollectionPage: BlitzPage = () => {
  const router = useRouter()
  const [createCollectionMutation] = useMutation(createCollection)

  return (
    <div>
      <h1>Create New Collection</h1>

      <CollectionForm
        submitText="Create Collection"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCollection}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const collection = await createCollectionMutation(values)
            router.push(Routes.ShowCollectionPage({ collectionId: collection.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CollectionsPage()}>
          <a>Collections</a>
        </Link>
      </p>
    </div>
  )
}

NewCollectionPage.authenticate = true
NewCollectionPage.getLayout = (page) => <Layout title={"Create New Collection"}>{page}</Layout>

export default NewCollectionPage
