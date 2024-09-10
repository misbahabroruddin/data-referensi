"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePekerjaan } from "@/handlers/biodata/pekerjaan/delete-pekerjaan";
import { ModalDetailPekerjaan } from "./modal-detail-pekerjaan";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeletePekerjaan();

  const columns: ColumnDef<Pekerjaan>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "kategori",
      header: () => {
        return <div className="text-center">Kategori</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.kategori}</div>
      ),
    },
    {
      accessorKey: "deskripsi",
      header: () => {
        return <div className="text-center">Deskripsi</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.deskripsi}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailPekerjaan pekerjaanId={row.original.id!} isEdit />
          <ModalDetailPekerjaan pekerjaanId={row.original.id!} />
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
