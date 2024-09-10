"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreAlmamater } from "@/handlers/biodata/almamater/trash/restore-trash-almamater";

export const useColumnTable = () => {
  const { mutateAsync: onRestoreRole, isPending: isLoadingRestore } =
    useRestoreAlmamater();

  const columns: ColumnDef<Almamater>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "ukuran",
      header: () => {
        return <div className="text-center">Ukuran</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.ukuran}</div>
      ),
    },
    {
      accessorKey: "kode",
      header: () => {
        return <div className="text-center">Kode</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.kode}</div>,
    },
    {
      accessorKey: "lingkar_dada",
      header: () => {
        return <div className="text-center">Lingkar Dada</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.lingkar_dada}</div>
      ),
    },
    {
      accessorKey: "panjang_lengan",
      header: () => {
        return <div className="text-center">Panjang Lengan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.panjang_lengan}</div>
      ),
    },
    {
      accessorKey: "panjang_badan",
      header: () => {
        return <div className="text-center">Panjang Badan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.panjang_badan}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onRestoreRole(row.original.id!)}
            title="Restore"
          >
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm agamaId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
