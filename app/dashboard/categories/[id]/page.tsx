
import {UpdateCategorieForm} from './update-form'

export default async function CategoriePage({ params }:  { params: Promise<{ id: string }> }){
  const id = (await params).id;
  return (
    <>
      <UpdateCategorieForm id={id} />
    </>
  )
}
