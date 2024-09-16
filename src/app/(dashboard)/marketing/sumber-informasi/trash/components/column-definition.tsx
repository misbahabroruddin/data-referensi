"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestoreSumberInformasi } from "@/handlers/marketing/sumber-informasi/trash/restore-trash-sumber-informasi";

export const useColumnTable = () => {
  const { mutateAsync: onRestore, isPending: isLoadingRestore } =
    useRestoreSumberInformasi();

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
          <button onClick={() => onRestore(row.original.id!)} title="Restore">
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm programId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
