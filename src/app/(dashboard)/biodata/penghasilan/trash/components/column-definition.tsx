"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestorePenghasilan } from "@/handlers/biodata/penghasilan/trash/restore.trash-penghasilan";

export const useColumnTable = () => {
  const { mutateAsync: onRestoreRole, isPending: isLoadingRestore } =
    useRestorePenghasilan();

  const columns: ColumnDef<Penghasilan>[] = [
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
      accessorKey: "kode",
      header: () => {
        return <div className="text-center">Kode</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.kode}</div>,
    },
    {
      accessorKey: "rentang",
      header: () => {
        return <div className="text-center">Rentang Penghasilan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.rentang}</div>
      ),
    },
    {
      accessorKey: "point_kip_kuliah",
      header: () => {
        return <div className="text-center">Point KIP Kuliah</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.point_kip_kuliah}</div>
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
