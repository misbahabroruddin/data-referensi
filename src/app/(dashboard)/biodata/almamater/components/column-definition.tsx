"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteAlmamater } from "@/handlers/biodata/almamater/delete-almamater";
import { ModalDetailAlmamater } from "./modal-detail-almamater";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteAlmamater();

  const columns: ColumnDef<Almamater>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "ukuran",
      header: () => {
        return <div className="text-center">Ukuran</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.ukuran}</div>
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
      accessorKey: "lingkar_dada",
      header: () => {
        return <div className="text-center">Lingkar Dada</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.lingkar_dada}</div>
      ),
    },
    {
      accessorKey: "panjang_lengan",
      header: () => {
        return <div className="text-center">Panjang Lengan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.panjang_lengan}</div>
      ),
    },
    {
      accessorKey: "panjang_badan",
      header: () => {
        return <div className="text-center">Panjang Badan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.panjang_badan}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailAlmamater almamaterId={row.original.id!} isEdit />
          <ModalDetailAlmamater almamaterId={row.original.id!} />
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
