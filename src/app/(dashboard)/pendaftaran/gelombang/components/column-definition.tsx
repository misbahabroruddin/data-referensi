"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteGelombang } from "@/handlers/pendaftaran/gelombang/delete-gelombang";
import { ModalDetailGelombang } from "./modal-detail-gelombang";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteGelombang();

  const columns: ColumnDef<Gelombang>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "gelombang",
      header: () => {
        return <div className="text-center">Gelombang</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.gelombang}</div>
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
      accessorKey: "keterangan",
      header: () => {
        return <div className="text-center">Keterangan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.keterangan}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailGelombang gelombangId={row.original.id!} isEdit />
          <ModalDetailGelombang gelombangId={row.original.id!} />
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
