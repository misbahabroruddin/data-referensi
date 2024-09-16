"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteSumberInformasi } from "@/handlers/marketing/sumber-informasi/delete-sumber-informasi";
import { ModalDetailSumberInformasi } from "./modal-detail-sumber-informasi";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } =
    useDeleteSumberInformasi();

  const columns: ColumnDef<SumberInformasi>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "sumber_informasi",
      header: () => {
        return <div className="text-center">Sumber Informasi</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.sumber_informasi}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailSumberInformasi
            sumberInformasiId={row.original.id!}
            isEdit
          />
          <ModalDetailSumberInformasi sumberInformasiId={row.original.id!} />
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
