"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestorePekerjaan } from "@/handlers/biodata/pekerjaan/trash/restore-pekerjaan";

export const useColumnTable = () => {
  const { mutateAsync: onRestoreRole, isPending: isLoadingRestore } =
    useRestorePekerjaan();

  const columns: ColumnDef<Pekerjaan>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "kategori",
      header: () => {
        return <div className="text-center">Kategori</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.kategori}</div>
      ),
    },
    {
      accessorKey: "deskripsi",
      header: () => {
        return <div className="text-center">Deskripsi</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.deskripsi}</div>
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
