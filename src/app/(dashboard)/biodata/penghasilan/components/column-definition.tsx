"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePenghasilan } from "@/handlers/biodata/penghasilan/delete-penghasilan";
import { ModalDetailPenghasilan } from "./modal-detail-penghasilan";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeletePenghasilan();

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
        return <div className="text-center">Rentang</div>;
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
          <ModalDetailPenghasilan penghasilanId={row.original.id!} isEdit />
          <ModalDetailPenghasilan penghasilanId={row.original.id!} />
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
