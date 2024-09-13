"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import { RestoreIcon } from "@/components/svg/restore";
import { ModalDeleteConfirm } from "./modal-delete-confirm";
import { useRestorePengumuman } from "@/handlers/berita/pengumuman/trash/restore-trash-pengumuman";

export const useColumnTable = () => {
  const { mutateAsync: onRestorePengumuman, isPending: isLoadingRestore } =
    useRestorePengumuman();

  const columns: ColumnDef<Pengumuman>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "judul",
      header: () => {
        return <div className="text-center">Judul</div>;
      },
      cell: ({ row }) => <div className="text-start">{row.original.judul}</div>,
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
      accessorKey: "keterangan",
      header: () => {
        return <div className="text-center">Keterangan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.keterangan}</div>
      ),
    },
    {
      accessorKey: "tampil_beranda",
      header: () => {
        return <div className="text-center">Tampil Beranda</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.tampil_beranda === "1" ? (
            <CheckIcon className="mx-auto h-5 w-5" />
          ) : (
            <XIcon className="mx-auto h-4 w-4" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "tampil_pendaftaran",
      header: () => {
        return <div className="text-center">Tampil Pendaftaran</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.tampil_pendaftaran === "1" ? (
            <CheckIcon className="mx-auto h-5 w-5" />
          ) : (
            <XIcon className="mx-auto h-4 w-4" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onRestorePengumuman(row.original.id!)}
            title="Restore"
          >
            {isLoadingRestore ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RestoreIcon className="h-4 w-4" />
            )}
          </button>
          <ModalDeleteConfirm pengumumanId={row.original.id!} />
        </div>
      ),
    },
  ];

  return { columns };
};
