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
import { useUpdateKecamatan } from "@/handlers/wilayah/kecamatan/update-kecamatan";
import { useGetDetailKecamatan } from "@/handlers/wilayah/kecamatan/get-detail-kecamatan";
import { useSearchKabupaten } from "@/handlers/wilayah/kabupaten/search-kabupaten";

export const ModalDetailKecamatan: React.FC<{
  isEdit?: boolean;
  kecamatanId: string;
}> = ({ isEdit = false, kecamatanId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitKecamatan,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateKecamatan(kecamatanId);

  const {
    data: detailKecamatan,
    refetch: getDetailKecamatan,
    isLoading: isLoadingDetailKecamatan,
  } = useGetDetailKecamatan(kecamatanId);

  const { data: dataKabupaten, isLoading: isLoadingKabupatenOptions } =
    useSearchKabupaten();

  const kabupatenOptions = dataKabupaten?.data?.data?.map((item: any) => ({
    label: item.nama,
    value: item.id,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama: "",
      kode: "",
    },
  });

  const { nama, kabupaten_id, kode } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitKecamatan(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailKecamatan();

      const selectedKabupaten = kabupatenOptions?.find(
        (val: any) => detailKecamatan?.data?.kabupaten_id === val.value,
      );

      form.setValue("kabupaten_id", selectedKabupaten);
      form.setValue("nama", detailKecamatan?.data?.nama);
      form.setValue("kode", detailKecamatan?.data?.kode);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    const selectedKabupaten = kabupatenOptions?.find(
      (val: any) => detailKecamatan?.data?.kabupaten_id === val.value,
    );

    form.setValue("kabupaten_id", selectedKabupaten);
    form.setValue("nama", detailKecamatan?.data?.nama);
    form.setValue("kode", detailKecamatan?.data?.kode);
  }, [detailKecamatan]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Kecamatan
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="kabupaten_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="kabupaten_id"
                    className="col-span-6 text-sm text-black-07"
                  >
                    Kabupaten <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <SelectComponent
                    createAble={false}
                    {...field}
                    value={field.value}
                    options={kabupatenOptions}
                    onChange={field.onChange}
                    placeholder="Pilih Kabupaten"
                    isLoading={
                      isLoadingKabupatenOptions || isLoadingDetailKecamatan
                    }
                    isDisabled={
                      isLoadingKabupatenOptions ||
                      !isEdit ||
                      isLoadingDetailKecamatan
                    }
                    isError={kabupaten_id}
                  />
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
                      disabled={
                        !isEdit || isLoadingSubmit || isLoadingDetailKecamatan
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
                        !isEdit || isLoadingSubmit || isLoadingDetailKecamatan
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
