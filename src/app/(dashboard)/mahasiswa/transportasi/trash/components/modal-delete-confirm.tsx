"use client";

import { useState } from "react";

import { DeleteIcon } from "@/components/svg/delete";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteTrashTransportasi } from "@/handlers/mahasiswa/transportasi/trash/delete-trash-transportasi";

export const ModalDeleteConfirm = ({ agamaId }: { agamaId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutateAsync, isPending } = useDeleteTrashTransportasi();

  const onDeleteTransportasi = async () => {
    await mutateAsync(agamaId);
    setIsModalOpen(true);
  };

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger asChild>
        <button title="Hapus">
          <DeleteIcon className="ml-[6px]" height="15" width="14" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Anda yakin?</DialogTitle>
          <DialogDescription className="my-8 text-center">
            Anda tidak dapat mengembalikan ini
          </DialogDescription>
          <div className="flex justify-center gap-2">
            <DialogClose asChild>
              <Button className="w-full bg-red-500 hover:bg-red-700">
                Batal
              </Button>
            </DialogClose>
            <Button
              onClick={onDeleteTransportasi}
              disabled={isPending}
              className="w-full bg-blue-05 hover:bg-blue-900"
            >
              {isPending ? <Spinner className="h-4 w-4" /> : "Hapus"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
