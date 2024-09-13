"use client";

import React, { useEffect, useState } from "react";
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
import { SelectComponent } from "@/components/ui/select";
import { useSearchMataPelajaran } from "@/handlers/seleksi/mata-pelajaran/search-mata-pelajaran";
import { useUpdatePenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/update-penilaian-rapor";
import { useGetDetailPenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/get-detail-penilaian-rapor";

export const ModalDetailPenilaianRapor: React.FC<{
  isEdit?: boolean;
  penilaianRaporId: string;
}> = ({ isEdit = false, penilaianRaporId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitPenilaianRapor,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdatePenilaianRapor(penilaianRaporId);

  const {
    data: detailPenilaianRapor,
    refetch: getDetailPenilaianRapor,
    isLoading: isLoadingDetailPenilaianRapor,
  } = useGetDetailPenilaianRapor(penilaianRaporId);

  const { data: dataMataPelajaran, isLoading: isLoadingMataPelajaranOptions } =
    useSearchMataPelajaran();

  const mataPelajaranOptions = dataMataPelajaran?.data?.data?.map(
    (item: any) => ({
      label: item.nama,
      value: item.id,
    }),
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama_penilaian: "",
      kode: "",
    },
  });

  const { nama_penilaian, kode, nilai, mata_pelajaran_id } =
    form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitPenilaianRapor(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailPenilaianRapor();

      const selectedMataPelajaran = mataPelajaranOptions?.find(
        (val: any) =>
          detailPenilaianRapor?.data?.mata_pelajaran_id === val.value,
      );

      form.setValue("mata_pelajaran_id", selectedMataPelajaran);
      form.setValue(
        "nama_penilaian",
        detailPenilaianRapor?.data?.nama_penilaian,
      );
      form.setValue("nilai", detailPenilaianRapor?.data?.nilai);
      form.setValue("kode", detailPenilaianRapor?.data?.kode);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    const selectedMataPelajaran = mataPelajaranOptions?.find(
      (val: any) => detailPenilaianRapor?.data?.mata_pelajaran_id === val.value,
    );

    form.setValue("mata_pelajaran_id", selectedMataPelajaran);
    form.setValue("nama_penilaian", detailPenilaianRapor?.data?.nama_penilaian);
    form.setValue("nilai", detailPenilaianRapor?.data?.nilai);
    form.setValue("kode", detailPenilaianRapor?.data?.kode);
  }, [detailPenilaianRapor]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Penilaian Rapor
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="mata_pelajaran_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="mata_pelajaran_id"
                    className="col-span-6 text-sm text-black-07"
                  >
                    Mata Pelajaran{" "}
                    <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <SelectComponent
                    createAble={false}
                    {...field}
                    value={field.value}
                    options={mataPelajaranOptions}
                    onChange={field.onChange}
                    placeholder="Pilih Mata Pelajaran"
                    isLoading={
                      isLoadingMataPelajaranOptions ||
                      isLoadingDetailPenilaianRapor
                    }
                    isDisabled={
                      isLoadingMataPelajaranOptions ||
                      !isEdit ||
                      isLoadingDetailPenilaianRapor
                    }
                    isError={mata_pelajaran_id}
                  />
                  <FormMessage className="col-span-6 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_penilaian"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="nama_penilaian"
                  >
                    Nama <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama_penilaian"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        nama_penilaian && validationErrorClass,
                      )}
                      placeholder="Nama"
                      tabIndex={1}
                      disabled={
                        !isEdit ||
                        isLoadingSubmit ||
                        isLoadingDetailPenilaianRapor
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-6 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nilai"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="nilai"
                  >
                    Nilai <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nilai"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        nilai && validationErrorClass,
                      )}
                      placeholder="Nilai"
                      tabIndex={1}
                      disabled={
                        !isEdit ||
                        isLoadingSubmit ||
                        isLoadingDetailPenilaianRapor
                      }
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-6 mt-0" />
                </FormItem>
              )}
            />
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
                      disabled={
                        !isEdit ||
                        isLoadingSubmit ||
                        isLoadingDetailPenilaianRapor
                      }
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
                      disabled={
                        !isEdit ||
                        isLoadingSubmit ||
                        isLoadingDetailPenilaianRapor
                      }
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
