"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormSchema } from "./form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { validationErrorClass } from "@/lib/constant/error-class";
import { EditIcon } from "@/components/svg/edit";
import { EyeIcon } from "@/components/svg/eye";
import { useUpdateJabatanFungsional } from "@/handlers/jabatan/jabatan-fungsional/update-jabatan-fungsional";
import { useGetDetailJabatanFungsional } from "@/handlers/jabatan/jabatan-fungsional/get-detail-jabatan-fungsional";

export const ModalDetailJabatanFungsional: React.FC<{
  isEdit?: boolean;
  jabatanFungsionalId: string;
}> = ({ isEdit = false, jabatanFungsionalId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitJabatanFungsional,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateJabatanFungsional(jabatanFungsionalId);

  const {
    data: detailJabatanFungsional,
    refetch: getDetailJabatanFungsional,
    isLoading,
  } = useGetDetailJabatanFungsional(jabatanFungsionalId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama: "",
      keterangan: "",
    },
  });

  const { nama } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitJabatanFungsional(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailJabatanFungsional();
      form.setValue("nama", detailJabatanFungsional?.data?.nama);
      if (detailJabatanFungsional?.data?.keterangan) {
        form.setValue("keterangan", detailJabatanFungsional?.data?.keterangan);
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    form.setValue("nama", detailJabatanFungsional?.data?.nama);
    if (detailJabatanFungsional?.data?.keterangan) {
      form.setValue("keterangan", detailJabatanFungsional?.data?.keterangan);
    }
  }, [detailJabatanFungsional]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Jabatan Fungsional
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="nama"
                  >
                    Nama <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        nama && validationErrorClass,
                      )}
                      placeholder="Nama"
                      tabIndex={1}
                      disabled={isLoading || !isEdit}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-6 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="keterangan"
                  >
                    Keterangan
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="keterangan"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                      )}
                      placeholder="Keterangan"
                      tabIndex={1}
                      disabled={isLoading || !isEdit}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-6 mt-0" />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-2">
              {isEdit ? (
                <Button
                  type="submit"
                  className="mt-2 w-32 bg-blue-05 hover:bg-blue-06"
                  disabled={isLoadingSubmit}
                >
                  {isLoadingSubmit ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    "Perbarui"
                  )}
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="mt-2 w-32 bg-blue-05 hover:bg-blue-06"
                  >
                    Tutup
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};