"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteKriteriaPenilaian } from "@/handlers/sippm/kriteria-penilaian/delete-kriteria-penilaian";
import { ModalDetailKriteriaPenilaian } from "./modal-detail-kriteria-penilaian";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } =
    useDeleteKriteriaPenilaian();

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
          <ModalDetailKriteriaPenilaian
            kriteriaPenilaianId={row.original.id!}
            isEdit
          />
          <ModalDetailKriteriaPenilaian
            kriteriaPenilaianId={row.original.id!}
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
