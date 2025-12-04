"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/type";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardHome() {

  const route = useRouter();
  const {data: session} = useSession();
  const userSession = session?.user;
  const id = userSession?.id;

  if(!session) {
    route.push("/signIn");
  }

  // ✅ useQuery pour récupérer les utilisateurs depuis Prisma
    const { data: user} = useQuery<User>({
      queryKey: ["utilisateur", id],
      queryFn: async () => {
        const res = await fetch(`/api/utilisateurs/${id}`);
        if (!res.ok) throw new Error("Erreur chargement utilisateurs");
        return res.json();
      },
    });

  // 🔐 Récupération session Better Auth
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Erreur serveur");
      return res.json();
    },
  });

  if(user?.role !== "ADMIN") {
    route.push("/");
  }


  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Impossible de charger le tableau de bord.</p>;

  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Tableau de bord</h2>
        <p>Bienvenue sur le panneau d’administration du blog !</p>
      </div>

      <div className="min-h-screen text-black space-y-8">
        {/* --- Statistiques principales --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">Utilisateurs</h2>
            <p className="text-4xl font-bold">{data.users}</p>
          </div>

          <div className="p-6 border rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">Posts</h2>
            <p className="text-4xl font-bold">{data.posts}</p>
          </div>

          <div className="p-6 border rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">Catégories</h2>
            <p className="text-4xl font-bold">{data.categories}</p>
          </div>
        </div>

        {/* --- Vue Globale & Derniers utilisateurs --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="p-6 border rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Vue Globale</h2>
            <ul className="space-y-2">
              <li className="flex justify-between border p-2 rounded-lg">
                <span>Total vues des posts</span>
                <span className="font-bold">
                  {data.totalViews.toLocaleString()}
                </span>
              </li>

              <li className="flex justify-between border p-2 rounded-lg">
                <span>Posts populaires</span>
                <span className="font-bold">{data.popularPosts}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Derniers utilisateurs</h2>
            <ul className="space-y-2">
              {data.latestUsers.map((user: User, i: number) => (
                <li key={i} className="border p-2 rounded-lg">
                  {user.name ?? "Utilisateur"} — {user.email}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
