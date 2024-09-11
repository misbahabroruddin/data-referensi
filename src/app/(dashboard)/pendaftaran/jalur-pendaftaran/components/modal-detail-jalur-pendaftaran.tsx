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
import { useUpdateJalurPendaftaran } from "@/handlers/pendaftaran/jalur-pendaftaran/update-jalur-pendaftaran";
import { useGetDetailJalurPendaftaran } from "@/handlers/pendaftaran/jalur-pendaftaran/get-detail-jalur-pendaftaran";

export const ModalDetailJalurPendaftaran: React.FC<{
  isEdit?: boolean;
  jalurPendaftaranId: string;
}> = ({ isEdit = false, jalurPendaftaranId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitJalurPendaftaran,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateJalurPendaftaran(jalurPendaftaranId);

  const {
    data: detailJalurPendaftaran,
    refetch: getDetailJalurPendaftaran,
    isLoading,
  } = useGetDetailJalurPendaftaran(jalurPendaftaranId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jalur_pendaftaran: "",
      jenis_pendaftaran: "",
      kode: "",
      keterangan: "",
    },
  });

  const { jalur_pendaftaran, jenis_pendaftaran, kode } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitJalurPendaftaran(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailJalurPendaftaran();
      form.setValue(
        "jalur_pendaftaran",
        detailJalurPendaftaran?.data?.jalur_pendaftaran,
      );
      form.setValue(
        "jenis_pendaftaran",
        detailJalurPendaftaran?.data?.jenis_pendaftaran,
      );
      form.setValue("kode", detailJalurPendaftaran?.data?.kode);
      if (detailJalurPendaftaran?.data?.keterangan) {
        form.setValue("keterangan", detailJalurPendaftaran?.data?.keterangan);
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
    form.setValue(
      "jalur_pendaftaran",
      detailJalurPendaftaran?.data?.jalur_pendaftaran,
    );
    form.setValue(
      "jenis_pendaftaran",
      detailJalurPendaftaran?.data?.jenis_pendaftaran,
    );
    form.setValue("kode", detailJalurPendaftaran?.data?.kode);
    if (detailJalurPendaftaran?.data?.keterangan) {
      form.setValue("keterangan", detailJalurPendaftaran?.data?.keterangan);
    }
  }, [detailJalurPendaftaran]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Jalur Pendaftaran
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
              name="jalur_pendaftaran"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="jalur_pendaftaran"
                  >
                    Jalur Pendaftaran{" "}
                    <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="jalur_pendaftaran"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        jalur_pendaftaran && validationErrorClass,
                      )}
                      placeholder="Jalur Pendaftaran"
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
              name="jenis_pendaftaran"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="jenis_pendaftaran"
                  >
                    Jenis Pendaftaran{" "}
                    <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="jenis_pendaftaran"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        jenis_pendaftaran && validationErrorClass,
                      )}
                      placeholder="Jenis Pendaftaran"
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
