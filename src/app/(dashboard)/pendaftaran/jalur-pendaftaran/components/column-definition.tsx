"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteJalurPendaftaran } from "@/handlers/pendaftaran/jalur-pendaftaran/delete-jalur-pendaftaran";
import { ModalDetailJalurPendaftaran } from "./modal-detail-jalur-pendaftaran";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } =
    useDeleteJalurPendaftaran();

  const columns: ColumnDef<JalurPendaftaran>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "jalur_pendaftaran",
      header: () => {
        return <div className="text-center">Jalur Pendaftaran</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.jalur_pendaftaran}</div>
      ),
    },
    {
      accessorKey: "jenis_pendaftaran",
      header: () => {
        return <div className="text-center">Jenis Pendaftaran</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.jenis_pendaftaran}</div>
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
      accessorKey: "keterangan",
      header: () => {
        return <div className="text-center">Keterangan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.keterangan}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailJalurPendaftaran
            jalurPendaftaranId={row.original.id!}
            isEdit
          />
          <ModalDetailJalurPendaftaran jalurPendaftaranId={row.original.id!} />
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
