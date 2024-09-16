"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreRincianBiaya } from "@/handlers/sippm/rincian-biaya/trash/restore-trash-rincian-biaya";
import { convertToRupiah } from "@/lib/utils/convert-to-rupiah";

export const useColumnTable = () => {
  const { mutateAsync: onRestore, isPending: isLoadingRestore } =
    useRestoreRincianBiaya();

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
          <button onClick={() => onRestore(row.original.id!)} title="Restore">
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm rincianBiayaId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
