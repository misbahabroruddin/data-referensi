"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteInformasi } from "@/handlers/berita/informasi/delete-informasi";
import { ModalDetailInformasi } from "./modal-detail-informasi";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteInformasi();

  const columns: ColumnDef<Informasi>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "judul",
      header: () => {
        return <div className="text-center">Judul</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.judul}</div>,
    },
    {
      accessorKey: "url",
      header: () => {
        return <div className="text-center">URL</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.url}</div>,
    },
    {
      accessorKey: "urutan",
      header: () => {
        return <div className="text-center">Urutan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.urutan}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => {
        return <div className="text-center">Status</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.status === "1" ? (
            <CheckIcon className="mx-auto h-5 w-5" />
          ) : (
            <XIcon className="mx-auto h-4 w-4" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailInformasi informasiId={row.original.id!} isEdit />
          <ModalDetailInformasi informasiId={row.original.id!} />
          <button
            title="Hapus"
            onClick={() => mutateAsync(row.original.id!)}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
              <Spinner className="mx-auto h-5 w-5" />
            ) : (
              <DeleteIcon className="ml-[6px]" height="15" width="14" />
            )}
          </button>
        </div>
      ),
    },
  ];

  return { columns };
};
