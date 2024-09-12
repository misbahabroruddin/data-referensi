"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreJenisSyarat } from "@/handlers/seleksi/jenis-syarat/trash/restore-trash-jenis-syarat";

export const useColumnTable = () => {
  const { mutateAsync: onRestore, isPending: isLoadingRestore } =
    useRestoreJenisSyarat();

  const columns: ColumnDef<JenisSyarat>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "jenis_syarat",
      header: () => {
        return <div className="text-center">Jenis Syarat</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.jenis_syarat}</div>
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
      accessorKey: "keterangan",
      header: () => {
        return <div className="text-center">Keterangan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.keterangan}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button onClick={() => onRestore(row.original.id!)} title="Restore">
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm jenisSyaratId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
