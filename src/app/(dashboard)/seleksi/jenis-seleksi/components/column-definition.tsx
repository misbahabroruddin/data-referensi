"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import { useDeleteJenisSeleksi } from "@/handlers/seleksi/jenis-seleksi/delete-jenis-seleksi";
import { ModalDetailJenisSeleksi } from "./modal-detail-jenis-seleksi";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteJenisSeleksi();

  const columns: ColumnDef<JenisSeleksi>[] = [
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
      accessorKey: "kelulusan",
      header: () => {
        return <div className="text-center">Kelulusan</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.kelulusan}</div>
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
      accessorKey: "wajib_ikut",
      header: () => {
        return <div className="text-center">Wajib Ikut</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.wajib_ikut === "1" ? (
            <CheckIcon className="mx-auto h-5 w-5" />
          ) : (
            <XIcon className="mx-auto h-4 w-4" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "pakai_ruangan",
      header: () => {
        return <div className="text-center">Pakai Ruangan</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.pakai_ruangan === "1" ? (
            <CheckIcon className="mx-auto h-5 w-5" />
          ) : (
            <XIcon className="mx-auto h-4 w-4" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "bebas_tes",
      header: () => {
        return <div className="text-center">Bebas Tes</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.bebas_tes === "1" ? (
            <CheckIcon className="mx-auto h-5 w-5" />
          ) : (
            <XIcon className="mx-auto h-4 w-4" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "cbt",
      header: () => {
        return <div className="text-center">CBT</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.cbt === "1" ? (
            <CheckIcon className="mx-auto h-5 w-5" />
          ) : (
            <XIcon className="mx-auto h-4 w-4" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "upload_berkas",
      header: () => {
        return <div className="text-center">Upload Berkas</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.upload_berkas === "1" ? (
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
          <ModalDetailJenisSeleksi jenisSeleksiId={row.original.id!} isEdit />
          <ModalDetailJenisSeleksi jenisSeleksiId={row.original.id!} />
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
