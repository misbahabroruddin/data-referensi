"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteNegara } from "@/handlers/wilayah/negara/delete-negara";
import { ModalDetailNegara } from "./modal-detail-negara";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteNegara();

  const columns: ColumnDef<Negara>[] = [
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
      accessorKey: "kode_telepon",
      header: () => {
        return <div className="text-center">Kode Telepon</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.kode_telepon}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailNegara negaraId={row.original.id!} isEdit />
          <ModalDetailNegara negaraId={row.original.id!} />
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
