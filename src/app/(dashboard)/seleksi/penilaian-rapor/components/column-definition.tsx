"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { ModalDetailPenilaianRapor } from "./modal-detail-penilaian-rapor";
import { useDeletePenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/delete-penilaian-rapor";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeletePenilaianRapor();

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
          <ModalDetailPenilaianRapor
            penilaianRaporId={row.original.id!}
            isEdit
          />
          <ModalDetailPenilaianRapor penilaianRaporId={row.original.id!} />
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
