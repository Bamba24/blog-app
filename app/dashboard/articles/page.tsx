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
import type { Articles } from "@/app/types/type";

const columnHelper = createColumnHelper<Articles>();

export default function PostsPage() {
  const [open, setOpen] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const route = useRouter();
  const queryClient = useQueryClient();

  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("titre", { header: "Titre" }),
    columnHelper.accessor("slug", { header: "Slug" }),
    columnHelper.accessor("readTime", { header: "Temps de lecture" }),
    columnHelper.accessor("vues", { header: "Vues" }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => route.push(`/dashboard/articles/${row.original.id}`)}>
            Modifier
          </Button>

          <Button
            onClick={() => {
              setOpen(true);
              setArticleId(row.original.id);
            }}
          >
            Supprimer
          </Button>
        </div>
      ),
    }),
  ];

  const { data = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Erreur de chargement");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
    },
    onSuccess: () => {
      toast.success("Article supprimé !");
      queryClient.invalidateQueries({
      queryKey: ["articles"]
      });
      setOpen(false);
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

  return (
    <>
      <input
        type="text"
        placeholder="Rechercher..."
        className="border p-2 mb-3 w-full"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <table className="border w-full">
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
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

      <div className="flex gap-3 mt-3">
        <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
          Précédent
        </Button>

        <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
          Suivant
        </Button>
      </div>

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteMutation.mutate(articleId)}
      />
    </>
  );
}
