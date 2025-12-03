"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { User } from "@/app/types/type";

const columnHelper = createColumnHelper<User>();

export default function UsersTable() {
  const route = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");

  // ✅ useQuery pour récupérer les utilisateurs depuis Prisma
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["utilisateurs"],
    queryFn: async () => {
      const res = await fetch("/api/utilisateurs");
      if (!res.ok) throw new Error("Erreur chargement utilisateurs");
      return res.json();
    },
  });

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("name", {
      header: "Nom",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setUserId(row.original.id);
              setOpen(true);
            }}
            variant="destructive"
          >
            Supprimer
          </Button>
        </div>
      ),
    }),
  ];

  // 🔥 Mutation de suppression
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/utilisateurs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur suppression");
    },

    onSuccess: () => {
      toast.success("Utilisateur supprimé !");
      setOpen(false);
      route.push("/dashboard/utilisateurs");

      // Refresh useQuery
      queryClient.invalidateQueries({ queryKey: ["utilisateurs"] });
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement</p>;

  return (
    <>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="border p-2 mb-3 w-full"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {/* Tableau */}
      <table className="border w-full text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-3 mt-3">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </Button>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </Button>
      </div>

      {/* Modal de confirmation */}
      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteMutation.mutate(userId)}
      />
    </>
  );
}
