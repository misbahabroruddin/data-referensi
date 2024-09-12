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
import { useUpdateJenisProgram } from "@/handlers/pendaftaran/jenis-program/update-jenis-program";
import { useGetDetailJenisProgram } from "@/handlers/pendaftaran/jenis-program/get-detail-jenis-program";
import { Switch } from "@/components/ui/switch";

export const ModalDetailJenisProgram: React.FC<{
  isEdit?: boolean;
  jenisProgramId: string;
}> = ({ isEdit = false, jenisProgramId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitJenisProgram,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateJenisProgram(jenisProgramId);

  const {
    data: detailJenisProgram,
    refetch: getDetailJenisProgram,
    isLoading,
  } = useGetDetailJenisProgram(jenisProgramId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jenis_program: "",
      is_ipc: false,
      kode: "",
      keterangan: "",
    },
  });

  const { jenis_program, kode } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitJenisProgram(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailJenisProgram();
      form.setValue("jenis_program", detailJenisProgram?.data?.jenis_program);
      form.setValue("is_ipc", detailJenisProgram?.data?.is_ipc);
      form.setValue("kode", detailJenisProgram?.data?.kode);
      if (detailJenisProgram?.data?.keterangan) {
        form.setValue("keterangan", detailJenisProgram?.data?.keterangan);
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
    form.setValue("jenis_program", detailJenisProgram?.data?.jenis_program);
    form.setValue("is_ipc", detailJenisProgram?.data?.is_ipc);
    form.setValue("kode", detailJenisProgram?.data?.kode);
    if (detailJenisProgram?.data?.keterangan) {
      form.setValue("keterangan", detailJenisProgram?.data?.keterangan);
    }
  }, [detailJenisProgram]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Jenis Program
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="kode"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="kode"
                  >
                    Kode <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="kode"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        kode && validationErrorClass,
                      )}
                      placeholder="Kode"
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
              name="jenis_program"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="jenis_program"
                  >
                    Jenis Program{" "}
                    <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="jenis_program"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        jenis_program && validationErrorClass,
                      )}
                      placeholder="Jenis Program"
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
              name="is_ipc"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="is_ipc"
                  >
                    IPC <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
