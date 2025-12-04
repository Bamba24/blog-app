"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { Categories} from "@/app/types/type";


const columnHelper = createColumnHelper<Categories>();

export default function CategoryPage() {
  const route = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [categorieId, setCategorieId] = useState("");
  const queryClient = useQueryClient();

  // 🚀 Récupération avec useQuery
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Erreur lors du chargement");
      return res.json();
    }
  });

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("titre", {
      header: "Titre",
    }),
    columnHelper.accessor("slug", {
      header: "Slug",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setCategorieId(row.original.id);
              setOpen(true);
            }}
          >
            Supprimer
          </Button>
          <Button 
            onClick={() => {
              route.push(`/dashboard/categories/${row.original.id}`);
            }}
          >
            Modifier
          </Button>
        </div>
      ),
    }),
  ];

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur suppression");
    },
    onSuccess: () => {
      toast.success("Catégorie supprimée !");
      setOpen(false);
      route.refresh(); // rafraîchir la page

      // Si tu utilises QueryClient :
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      });
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
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
  if (error) return <p>Erreur de chargement</p>;

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          className="border p-2 mb-3 w-full"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <Button>Ajouter une catégorie</Button>
      </div>

      <table className="border w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteMutation.mutate(categorieId)}
        message="Êtes-vous sûr de supprimer cette catégorie ?"
        title="Suppression d'une catégorie"
      />
    </>
  );
}
