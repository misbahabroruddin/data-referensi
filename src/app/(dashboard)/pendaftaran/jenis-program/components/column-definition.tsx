"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DeleteIcon } from "@/components/svg/delete";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteJenisProgram } from "@/handlers/pendaftaran/jenis-program/delete-jenis-program";
import { ModalDetailJenisProgram } from "./modal-detail-jenis-program";
import { CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

export const useColumnTable = () => {
  const { mutateAsync, isPending: isLoadingDelete } = useDeleteJenisProgram();

  const columns: ColumnDef<JenisProgram>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "jenis_program",
      header: () => {
        return <div className="text-center">Jenis Program</div>;
      },
      cell: ({ row }) => (
        <div className="text-start">{row.original.jenis_program}</div>
      ),
    },
    {
      accessorKey: "is_ipc",
      header: () => {
        return <div className="text-center">IPC</div>;
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.is_ipc === "1" ? (
            <CheckIcon className="h-5 w-5" />
          ) : (
            <XIcon className="h-4 w-4" />
          )}
        </div>
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
          <ModalDetailJenisProgram jenisProgramId={row.original.id!} isEdit />
          <ModalDetailJenisProgram jenisProgramId={row.original.id!} />
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