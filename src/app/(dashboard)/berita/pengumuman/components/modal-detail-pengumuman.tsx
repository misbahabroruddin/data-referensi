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
import { useUpdatePengumuman } from "@/handlers/berita/pengumuman/update-pengumuman";
import { useGetDetailPengumuman } from "@/handlers/berita/pengumuman/get-detail-pengumuman";

export const ModalDetailPengumuman: React.FC<{
  isEdit?: boolean;
  pengumumanId: string;
}> = ({ isEdit = false, pengumumanId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitPengumuman,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdatePengumuman(pengumumanId);

  const {
    data: detailPengumuman,
    refetch: getDetailPengumuman,
    isLoading,
  } = useGetDetailPengumuman(pengumumanId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      judul: "",
      jenis_pendaftaran: "",
      keterangan: "",
      tampil_beranda: false,
      tampil_pendaftaran: false,
    },
  });

  const { judul, jenis_pendaftaran } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitPengumuman(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailPengumuman();
      form.setValue("judul", detailPengumuman?.data?.judul);

      form.setValue(
        "jenis_pendaftaran",
        detailPengumuman?.data?.jenis_pendaftaran,
      );

      form.setValue(
        "tampil_beranda",
        detailPengumuman?.data?.tampil_beranda === "1" ? true : false,
      );

      form.setValue(
        "tampil_pendaftaran",
        detailPengumuman?.data?.tampil_pendaftaran === "1" ? true : false,
      );

      if (detailPengumuman?.data?.keterangan) {
        form.setValue("keterangan", detailPengumuman?.data?.keterangan);
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
    form.setValue("judul", detailPengumuman?.data?.judul);

    form.setValue(
      "jenis_pendaftaran",
      detailPengumuman?.data?.jenis_pendaftaran,
    );

    form.setValue(
      "tampil_beranda",
      detailPengumuman?.data?.tampil_beranda === "1" ? true : false,
    );

    form.setValue(
      "tampil_pendaftaran",
      detailPengumuman?.data?.tampil_pendaftaran === "1" ? true : false,
    );

    if (detailPengumuman?.data?.keterangan) {
      form.setValue("keterangan", detailPengumuman?.data?.keterangan);
    }
  }, [detailPengumuman]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Pengumuman
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="judul"
                  >
                    Judul <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="judul"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        judul && validationErrorClass,
                      )}
                      placeholder="Judul"
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
            <div className="grid grid-cols-6 gap-2">
              <FormField
                control={form.control}
                name="tampil_beranda"
                render={({ field }) => (
                  <FormItem className="col-span-3 grid grid-cols-6 items-center">
                    <FormLabel
                      className="col-span-6 text-sm text-black-07"
                      htmlFor="tampil_beranda"
                    >
                      Tampil Beranda
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="tampil_beranda"
                        disabled={!isEdit}
                        className="disabled:cursor-default disabled:opacity-100"
                      />
                    </FormControl>
                    <FormMessage className="col-span-6 mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tampil_pendaftaran"
                render={({ field }) => (
                  <FormItem className="col-span-3 grid grid-cols-6 items-center">
                    <FormLabel
                      className="col-span-6 text-sm text-black-07"
                      htmlFor="tampil_pendaftaran"
                    >
                      Tampil Pendaftaran{" "}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="tampil_pendaftaran"
                        disabled={!isEdit}
                        className="disabled:cursor-default disabled:opacity-100"
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
