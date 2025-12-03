import React from 'react'
import {UpdateArticleForm} from "./update-form"

export default async function UpdatePage({params}: {params: Promise<{id: string}>}) {

  const articleId = (await params).id;

  return (
    <div>
       <UpdateArticleForm id={articleId} />
    </div>
  )
}
