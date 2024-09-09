"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { useRestoreNegara } from "@/handlers/wilayah/negara/trash/restore-trash-negara";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";

export const useColumnTable = () => {
  const { mutateAsync: onRestoreRole, isPending: isLoadingRestore } =
    useRestoreNegara();

  const columns: ColumnDef<Negara>[] = [
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
      accessorKey: "kode_telepon",
      header: () => {
        return <div className="text-center">Kode Telepon</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.kode_telepon}</div>
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
          <ModalDeleteConfirm negaraId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
