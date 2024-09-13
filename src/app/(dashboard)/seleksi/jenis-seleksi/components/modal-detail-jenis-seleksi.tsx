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
import { Switch } from "@/components/ui/switch";
import { useUpdateJenisSeleksi } from "@/handlers/seleksi/jenis-seleksi/update-jenis-seleksi";
import { useGetDetailJenisSeleksi } from "@/handlers/seleksi/jenis-seleksi/get-detail-jenis-seleksi";

export const ModalDetailJenisSeleksi: React.FC<{
  isEdit?: boolean;
  jenisSeleksiId: string;
}> = ({ isEdit = false, jenisSeleksiId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitJenisSeleksi,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateJenisSeleksi(jenisSeleksiId);

  const {
    data: detailJenisSeleksi,
    refetch: getDetailJenisSeleksi,
    isLoading,
  } = useGetDetailJenisSeleksi(jenisSeleksiId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama: "",
      kelulusan: "",
      kode: "",
      wajib_ikut: false,
      pakai_ruangan: false,
      bebas_tes: false,
      cbt: false,
      upload_berkas: false,
    },
  });

  const { kelulusan, kode, nama } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitJenisSeleksi(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailJenisSeleksi();
      form.setValue("nama", detailJenisSeleksi?.data?.nama);
      form.setValue("kelulusan", detailJenisSeleksi?.data?.kelulusan);
      form.setValue("kode", detailJenisSeleksi?.data?.kode);
      form.setValue(
        "wajib_ikut",
        detailJenisSeleksi?.data?.wajib_ikut === "1" ? true : false,
      );
      form.setValue(
        "pakai_ruangan",
        detailJenisSeleksi?.data?.pakai_ruangan === "1" ? true : false,
      );
      form.setValue(
        "bebas_tes",
        detailJenisSeleksi?.data?.bebas_tes === "1" ? true : false,
      );
      form.setValue(
        "cbt",
        detailJenisSeleksi?.data?.cbt === "1" ? true : false,
      );
      form.setValue(
        "upload_berkas",
        detailJenisSeleksi?.data?.upload_berkas === "1" ? true : false,
      );
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    form.setValue("nama", detailJenisSeleksi?.data?.nama);
    form.setValue("kelulusan", detailJenisSeleksi?.data?.kelulusan);
    form.setValue("kode", detailJenisSeleksi?.data?.kode);
    form.setValue(
      "wajib_ikut",
      detailJenisSeleksi?.data?.wajib_ikut === "1" ? true : false,
    );
    form.setValue(
      "pakai_ruangan",
      detailJenisSeleksi?.data?.pakai_ruangan === "1" ? true : false,
    );
    form.setValue(
      "bebas_tes",
      detailJenisSeleksi?.data?.bebas_tes === "1" ? true : false,
    );
    form.setValue("cbt", detailJenisSeleksi?.data?.cbt === "1" ? true : false);
    form.setValue(
      "upload_berkas",
      detailJenisSeleksi?.data?.upload_berkas === "1" ? true : false,
    );
  }, [detailJenisSeleksi]);

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
              name="kelulusan"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="kelulusan"
                  >
                    Kelulusan <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="kelulusan"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        kelulusan && validationErrorClass,
                      )}
                      placeholder="Kelulusan"
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
            <div className="grid grid-cols-6 gap-2">
              <FormField
                control={form.control}
                name="wajib_ikut"
                render={({ field }) => (
                  <FormItem className="col-span-2 grid grid-cols-6 items-center">
                    <FormLabel
                      className="col-span-6 text-sm text-black-07"
                      htmlFor="wajib_ikut"
                    >
                      Wajib Ikut
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="wajib_ikut"
                        disabled={!isEdit}
                        className="disabled:cursor-default"
                      />
                    </FormControl>
                    <FormMessage className="col-span-6 mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pakai_ruangan"
                render={({ field }) => (
                  <FormItem className="col-span-2 grid grid-cols-6 items-center">
                    <FormLabel
                      className="col-span-6 text-sm text-black-07"
                      htmlFor="pakai_ruangan"
                    >
                      Pakai Ruangan{" "}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="pakai_ruangan"
                        disabled={!isEdit}
                        className="disabled:cursor-default"
                      />
                    </FormControl>
                    <FormMessage className="col-span-6 mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bebas_tes"
                render={({ field }) => (
                  <FormItem className="col-span-2 grid grid-cols-6 items-center">
                    <FormLabel
                      className="col-span-6 text-sm text-black-07"
                      htmlFor="bebas_tes"
                    >
                      Bebas Tes
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="bebas_tes"
                        disabled={!isEdit}
                        className="disabled:cursor-default"
                      />
                    </FormControl>
                    <FormMessage className="col-span-6 mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cbt"
                render={({ field }) => (
                  <FormItem className="col-span-2 grid grid-cols-6 items-center">
                    <FormLabel
                      className="col-span-6 text-sm text-black-07"
                      htmlFor="cbt"
                    >
                      CBT
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="cbt"
                        disabled={!isEdit}
                        className="disabled:cursor-default"
                      />
                    </FormControl>
                    <FormMessage className="col-span-6 mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="upload_berkas"
                render={({ field }) => (
                  <FormItem className="col-span-2 grid grid-cols-6 items-center">
                    <FormLabel
                      className="col-span-6 text-sm text-black-07"
                      htmlFor="upload_berkas"
                    >
                      Upload Berkas
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="upload_berkas"
                        disabled={!isEdit}
                        className="disabled:cursor-default"
                      />
                    </FormControl>
                    <FormMessage className="col-span-6 mt-0" />
                  </FormItem>
                )}
              />
            </div>
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
