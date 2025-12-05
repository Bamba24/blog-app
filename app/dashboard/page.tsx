"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/type";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ----------------------------------------------------
// 🛡️ Hook de protection Admin (optionnel mais propre)
// ----------------------------------------------------
function useAdminGuard() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();

  useEffect(() => {
    if (!sessionPending && !session) {
      router.push("/signIn");
    }
  }, [session, sessionPending, router]);

  return session;
}

// ----------------------------------------------------
// 🧭 Component principal : Dashboard Admin
// ----------------------------------------------------
export default function DashboardHome() {
  const router = useRouter();

  // Session protégée
  const session = useAdminGuard();
  const userSession = session?.user;
  const id = userSession?.id;

  // --------------------------------------------
  // 🔹 Récupération du User connecté (rôle, etc.)
  // --------------------------------------------
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<User>({
    queryKey: ["utilisateur", id],
    queryFn: async () => {
      const res = await fetch(`/api/utilisateurs/${id}`);
      if (!res.ok) throw new Error("Erreur chargement utilisateur");
      return res.json();
    },
    enabled: !!id, // 👉 NE CHARGE QUE si on a l'id
  });

  // ------------------------------------------------
  // 🔐 Vérifier le rôle Admin (protection)
  // ------------------------------------------------
  useEffect(() => {
    if (!userLoading && user && user.role !== "ADMIN") {
      router.push("/"); // Retour à l'accueil si pas admin
    }
  }, [user, userLoading, router]);

  // --------------------------------------------
  // 📊 Stats Admin (activé UNIQUEMENT si Admin)
  // --------------------------------------------
  const {
    data,
    isLoading: statsLoading,
    isError: statsError,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Erreur serveur");
      return res.json();
    },
    enabled: !!user && user.role === "ADMIN", // 👉 Charge seulement si admin
  });

  // ----------------------------------------------------
  // 🕗 Gestion des chargements globales
  // ----------------------------------------------------
  if (session === undefined || userLoading) {
    return <p>Chargement...</p>;
  }

  if (userError || statsError) {
    return <p>Une erreur est survenue.</p>;
  }

  // ----------------------------------------------------
  // 🎉 Interface ADMIN
  // ----------------------------------------------------
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
              {data.latestUsers.map((u: User, i: number) => (
                <li key={i} className="border p-2 rounded-lg">
                  {u.name ?? "Utilisateur"} — {u.email}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
