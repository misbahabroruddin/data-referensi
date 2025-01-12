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
import { useUpdateDesa } from "@/handlers/wilayah/desa/update-desa";
import { useGetDetailDesa } from "@/handlers/wilayah/desa/get-detail-desa";
import { useSearchKecamatan } from "@/handlers/wilayah/kecamatan/search-kecamatan";

export const ModalDetailDesa: React.FC<{
  isEdit?: boolean;
  kecamatanId: string;
}> = ({ isEdit = false, kecamatanId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitDesa,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateDesa(kecamatanId);

  const {
    data: detailDesa,
    refetch: getDetailDesa,
    isLoading: isLoadingDetailDesa,
  } = useGetDetailDesa(kecamatanId);

  const { data: dataKecamatan, isLoading: isLoadingKecamatanOptions } =
    useSearchKecamatan();

  const kecamatanOptions = dataKecamatan?.data?.data?.map((item: any) => ({
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

  const { nama, kecamatan_id, kode } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitDesa(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailDesa();

      const selectedKecamatan = kecamatanOptions?.find(
        (val: any) => detailDesa?.data?.kecamatan_id === val.value,
      );

      form.setValue("kecamatan_id", selectedKecamatan);
      form.setValue("nama", detailDesa?.data?.nama);
      form.setValue("kode", detailDesa?.data?.kode);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    const selectedKecamatan = kecamatanOptions?.find(
      (val: any) => detailDesa?.data?.kecamatan_id === val.value,
    );

    form.setValue("kecamatan_id", selectedKecamatan);
    form.setValue("nama", detailDesa?.data?.nama);
    form.setValue("kode", detailDesa?.data?.kode);
  }, [detailDesa]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Desa
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="kecamatan_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="kecamatan_id"
                    className="col-span-6 text-sm text-black-07"
                  >
                    Kecamatan <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <SelectComponent
                    createAble={false}
                    {...field}
                    value={field.value}
                    options={kecamatanOptions}
                    onChange={field.onChange}
                    placeholder="Pilih Kecamatan"
                    isLoading={isLoadingKecamatanOptions || isLoadingDetailDesa}
                    isDisabled={
                      isLoadingKecamatanOptions ||
                      !isEdit ||
                      isLoadingDetailDesa
                    }
                    isError={kecamatan_id}
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
                        !isEdit || isLoadingSubmit || isLoadingDetailDesa
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
                        !isEdit || isLoadingSubmit || isLoadingDetailDesa
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
