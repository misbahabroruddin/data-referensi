"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreMataPelajaran } from "@/handlers/seleksi/mata-pelajaran/trash/restore-mata-pelajaran";

export const useColumnTable = () => {
  const { mutateAsync: onRestore, isPending: isLoadingRestore } =
    useRestoreMataPelajaran();

  const columns: ColumnDef<MataPelajaran>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "nama",
      header: () => {
        return <div className="text-center">Nama</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.nama}</div>,
    },
    {
      accessorKey: "point_minimal",
      header: () => {
        return <div className="text-center">Point Minimal</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.point_minimal}</div>
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
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onRestore(row.original.id!)}
            title="Restore"
            disabled={isLoadingRestore}
          >
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm mataPelajaranId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
