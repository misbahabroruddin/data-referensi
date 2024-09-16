"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreKomponenPenilaian } from "@/handlers/sippm/komponen-penilaian/trash/restore-trash-komponen-penilaian";

export const useColumnTable = () => {
  const { mutateAsync: onRestore, isPending: isLoadingRestore } =
    useRestoreKomponenPenilaian();

  const columns: ColumnDef<KomponenPenilaian>[] = [
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
      accessorKey: "kriteria_penilaian_id",
      header: () => {
        return <div className="text-center">Komponen Penilaian</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">
          {row.original.kriteria_penilaian?.nama}
        </div>
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
          <ModalDeleteConfirm komponenPenilaianId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
