"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreSuku } from "@/handlers/biodata/suku/trash/restore-trash-suku";

export const useColumnTable = () => {
  const { mutateAsync: onRestoreRole, isPending: isLoadingRestore } =
    useRestoreSuku();

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
          <button
            onClick={() => onRestoreRole(row.original.id!)}
            title="Restore"
          >
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm agamaId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};