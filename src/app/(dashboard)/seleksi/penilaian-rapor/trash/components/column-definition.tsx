"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestorePenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/trash/restore-penilaian-rapor";

export const useColumnTable = () => {
  const { mutateAsync: onRestorePenilaianRapor, isPending: isLoadingRestore } =
    useRestorePenilaianRapor();

  const columns: ColumnDef<PenilaianRapor>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "Mata Pelajaran",
      header: () => {
        return <div className="text-center">Mata Pelajaran</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.mata_pelajaran?.nama}</div>
      ),
    },
    {
      accessorKey: "nama_penilaian",
      header: () => {
        return <div className="text-center">Nama</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.nama_penilaian}</div>
      ),
    },
    {
      accessorKey: "nilai",
      header: () => {
        return <div className="text-center">Nilai</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.nilai}</div>,
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
            onClick={() => onRestorePenilaianRapor(row.original.id!)}
            title="Restore"
          >
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm penilaianRaporId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
