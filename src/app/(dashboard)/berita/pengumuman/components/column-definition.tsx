"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePengumuman } from "@/handlers/berita/pengumuman/delete-pengumuman";
import { ModalDetailPengumuman } from "./modal-detail-pengumuman";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeletePengumuman();

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
          <ModalDetailPengumuman pengumumanId={row.original.id!} isEdit />
          <ModalDetailPengumuman pengumumanId={row.original.id!} />
          <button
            title="Hapus"
            onClick={() => mutateAsync(row.original.id!)}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
              <Spinner className="mx-auto h-5 w-5" />
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
