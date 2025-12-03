import React from 'react'
import { CategoriesPage } from "./categories-page"

export default async function Page({params}: {params: Promise<{slug: string}>}) {

  const categorieSlug = (await params).slug;

  return (
    <>
      <CategoriesPage slug={categorieSlug} />
    </>
  )
}
