"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteKebutuhanKhusus } from "@/handlers/mahasiswa/kebutuhan-khusus/delete-kebutuhan-khusus";
import { ModalDetailKebutuhanKhusus } from "./modal-detail-kebutuhan-khusus";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } =
    useDeleteKebutuhanKhusus();

  const columns: ColumnDef<KebutuhanKhusus>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "kebutuhan_khusus",
      header: () => {
        return <div className="text-center">Kebutuhan Khusus</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.kebutuhan_khusus}</div>
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
          <ModalDetailKebutuhanKhusus
            kebutuhanKhususId={row.original.id!}
            isEdit
          />
          <ModalDetailKebutuhanKhusus kebutuhanKhususId={row.original.id!} />
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
