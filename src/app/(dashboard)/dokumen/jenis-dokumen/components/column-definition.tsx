"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteJenisDokumen } from "@/handlers/dokumen/jenis-dokumen/delete-jenis-dokumen";
import { ModalDetailJenisDokumen } from "./modal-detail-jenis-dokumen";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteJenisDokumen();

  const columns: ColumnDef<JenisDokumen>[] = [
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
      accessorKey: "mimes",
      header: () => {
        return <div className="text-center">Tipe Dokumen</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.mimes}</div>,
    },
    {
      accessorKey: "size",
      header: () => {
        return <div className="text-center">Size</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{`${row.original.size} Kb`}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailJenisDokumen jenisDokumenId={row.original.id!} isEdit />
          <ModalDetailJenisDokumen jenisDokumenId={row.original.id!} />
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
