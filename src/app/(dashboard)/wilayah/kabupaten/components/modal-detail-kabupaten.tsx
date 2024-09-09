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
import { useUpdateKabupaten } from "@/handlers/wilayah/kabupaten/update-kabupaten";
import { useGetDetailKabupaten } from "@/handlers/wilayah/kabupaten/get-detail-kabupaten";
import { useSearchProvinsi } from "@/handlers/wilayah/provinsi/search-provinsi";

export const ModalDetailKabupaten: React.FC<{
  isEdit?: boolean;
  kabupatenId: string;
}> = ({ isEdit = false, kabupatenId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitKabupaten,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateKabupaten(kabupatenId);

  const {
    data: detailKabupaten,
    refetch: getDetailKabupaten,
    isLoading: isLoadingDetailKabupaten,
  } = useGetDetailKabupaten(kabupatenId);

  const { data: dataProvinsi, isLoading: isLoadingProvinsiOptions } =
    useSearchProvinsi();

  const negaraOptions = dataProvinsi?.data?.data?.map((item: any) => ({
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

  const { nama, provinsi_id, kode } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitKabupaten(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailKabupaten();

      const selectedProvinsi = negaraOptions?.find(
        (val: any) => detailKabupaten?.data?.provinsi_id === val.value,
      );

      form.setValue("provinsi_id", selectedProvinsi);
      form.setValue("nama", detailKabupaten?.data?.nama);
      form.setValue("kode", detailKabupaten?.data?.kode);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    const selectedProvinsi = negaraOptions?.find(
      (val: any) => detailKabupaten?.data?.provinsi_id === val.value,
    );

    form.setValue("provinsi_id", selectedProvinsi);
    form.setValue("nama", detailKabupaten?.data?.nama);
    form.setValue("kode", detailKabupaten?.data?.kode);
  }, [detailKabupaten]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Kabupaten
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="provinsi_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="provinsi_id"
                    className="col-span-6 text-sm text-black-07"
                  >
                    Provinsi <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <SelectComponent
                    createAble={false}
                    {...field}
                    value={field.value}
                    options={negaraOptions}
                    onChange={field.onChange}
                    placeholder="Pilih Provinsi"
                    isLoading={
                      isLoadingProvinsiOptions || isLoadingDetailKabupaten
                    }
                    isDisabled={
                      isLoadingProvinsiOptions ||
                      !isEdit ||
                      isLoadingDetailKabupaten
                    }
                    isError={provinsi_id}
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
                        !isEdit || isLoadingSubmit || isLoadingDetailKabupaten
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
                        !isEdit || isLoadingSubmit || isLoadingDetailKabupaten
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
