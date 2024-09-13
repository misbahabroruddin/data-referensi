"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreInformasi } from "@/handlers/berita/informasi/trash/restore-trash-informasi";

export const useColumnTable = () => {
  const { mutateAsync: onRestoreInformasi, isPending: isLoadingRestore } =
    useRestoreInformasi();

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
          <button
            onClick={() => onRestoreInformasi(row.original.id!)}
            title="Restore"
          >
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm informasiId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
