// lib/api/articles.ts
import type { Articles } from "@/app/types/type";

export async function getArticles() {
  const res = await fetch("/api/articles");
  return res.json();
}

export async function createArticle(data: Articles) {
  const res = await fetch("/api/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateArticle(id: string, data: Articles) {
  const res = await fetch(`/api/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteArticle(id: string) {
  const res = await fetch(`/api/articles/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
