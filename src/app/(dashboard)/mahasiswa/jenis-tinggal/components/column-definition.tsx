"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteJenisTinggal } from "@/handlers/mahasiswa/jenis-tinggal/delete-jenis-tinggal";
import { ModalDetailJenisTinggal } from "./modal-detail-jenis-tinggal";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteJenisTinggal();

  const columns: ColumnDef<JenisTinggal>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "jenis_tinggal",
      header: () => {
        return <div className="text-center">Jenis Tinggal</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.jenis_tinggal}</div>
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
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailJenisTinggal jenisTinggalId={row.original.id!} isEdit />
          <ModalDetailJenisTinggal jenisTinggalId={row.original.id!} />
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
