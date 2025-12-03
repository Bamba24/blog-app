import React from 'react'
import {CreateArticleForm} from "./create-form";
import { getUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

export default async function page() {

  const user = await getUser();

  if(!user){
    redirect("/signIn");
  }

  return (
    <div>
      <CreateArticleForm id={user.id} />
    </div>
  )
}
