"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteSuku } from "@/handlers/biodata/suku/delete-suku";
import { ModalDetailSuku } from "./modal-detail-suku";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteSuku();

  const columns: ColumnDef<Suku>[] = [
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
      accessorKey: "daerah_asal",
      header: () => {
        return <div className="text-center">Daerah Asal</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.daerah_asal}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailSuku sukuId={row.original.id!} isEdit />
          <ModalDetailSuku sukuId={row.original.id!} />
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
