import React from 'react'
import {ArticlePage} from "./article-page"

export default async function page({params}: { params: Promise<{ slug: string }> }){ {

  const articleSlug = (await params).slug
  return (
    <>
      <ArticlePage slug={articleSlug} />
    </>
  )
}
}
