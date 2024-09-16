"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreKriteriaPenilaian } from "@/handlers/sippm/kriteria-penilaian/trash/restore-trash-kriteria-penilaian";

export const useColumnTable = () => {
  const { mutateAsync: onRestore, isPending: isLoadingRestore } =
    useRestoreKriteriaPenilaian();

  const columns: ColumnDef<KriteriaPenilaian>[] = [
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
      accessorKey: "bobot",
      header: () => {
        return <div className="text-center">Bobot</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.bobot}</div>,
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
          <ModalDeleteConfirm kriteriaPenilaianId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
