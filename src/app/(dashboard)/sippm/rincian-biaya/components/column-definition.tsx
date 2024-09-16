"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { ModalDetailRincianBiaya } from "./modal-detail-rincian-biaya";
import { useDeleteRincianBiaya } from "@/handlers/sippm/rincian-biaya/delete-rincian-biaya";
import { convertToRupiah } from "@/lib/utils/convert-to-rupiah";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteRincianBiaya();

  const columns: ColumnDef<RincianBiaya>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "rincian",
      header: () => {
        return <div className="text-center">Rincian</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.rincian}</div>
      ),
    },
    {
      accessorKey: "anggaran",
      header: () => {
        return <div className="text-center">Anggaran</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">
          {convertToRupiah(row.original.anggaran)}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailRincianBiaya rincianBiayaId={row.original.id!} isEdit />
          <ModalDetailRincianBiaya rincianBiayaId={row.original.id!} />
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
