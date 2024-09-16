"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteKomponenPenilaian } from "@/handlers/sippm/komponen-penilaian/delete-komponen-penilaian";
import { ModalDetailKomponenPenilaian } from "./modal-detail-komponen-penilaian";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } =
    useDeleteKomponenPenilaian();

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
        return <div className="text-center">Kriteria Penilaian</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.kriteria_penilaian.nama}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailKomponenPenilaian
            komponenPenilaianId={row.original.id!}
            isEdit
          />
          <ModalDetailKomponenPenilaian
            komponenPenilaianId={row.original.id!}
          />
          <button
            title="Hapus"
            onClick={() => mutateAsync(row.original.id!)}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
              <Spinner className="h-5 w-5" />
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
