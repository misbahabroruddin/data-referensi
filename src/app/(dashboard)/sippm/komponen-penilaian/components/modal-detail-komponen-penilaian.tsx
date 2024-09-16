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
import { useUpdateKomponenPenilaian } from "@/handlers/sippm/komponen-penilaian/update-komponen-penilaian";
import { useGetDetailKomponenPenilaian } from "@/handlers/sippm/komponen-penilaian/get-detail-komponen-penilaian";
import { useSearchKriteriaPenilaian } from "@/handlers/sippm/kriteria-penilaian/search-kriteria-penilaian";
import { SelectComponent } from "@/components/ui/select";

export const ModalDetailKomponenPenilaian: React.FC<{
  isEdit?: boolean;
  komponenPenilaianId: number;
}> = ({ isEdit = false, komponenPenilaianId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitKomponenPenilaian,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateKomponenPenilaian(komponenPenilaianId);

  const {
    data: detailKomponenPenilaian,
    refetch: getDetailKomponenPenilaian,
    isLoading,
  } = useGetDetailKomponenPenilaian(komponenPenilaianId);

  const {
    data: dataKriteriaPenilaian,
    isLoading: isLoadingKriteriaPenilaianOptions,
  } = useSearchKriteriaPenilaian();

  const kriteriaPenilaianptions = dataKriteriaPenilaian?.data?.data?.map(
    (item: any) => ({
      label: item.nama,
      value: item.id,
    }),
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama: "",
    },
  });

  const { nama, kriteria_penilaian_id } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitKomponenPenilaian(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailKomponenPenilaian();

      const selectedKriteriaPenilaian = kriteriaPenilaianptions?.find(
        (val: any) =>
          detailKomponenPenilaian?.data?.kriteria_penilaian.id === val.value,
      );

      form.setValue("nama", detailKomponenPenilaian?.data?.nama);
      form.setValue("kriteria_penilaian_id", selectedKriteriaPenilaian);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    const selectedKriteriaPenilaian = kriteriaPenilaianptions?.find(
      (val: any) =>
        detailKomponenPenilaian?.data?.kriteria_penilaian.id === val.value,
    );

    form.setValue("nama", detailKomponenPenilaian?.data?.nama);
    form.setValue("kriteria_penilaian_id", selectedKriteriaPenilaian);
  }, [detailKomponenPenilaian]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Komponen Penilaian
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="kriteria_penilaian_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="kriteria_penilaian_id"
                  >
                    Kriteria Penilaian{" "}
                    <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <SelectComponent
                    createAble={false}
                    {...field}
                    value={field.value}
                    options={kriteriaPenilaianptions}
                    onChange={field.onChange}
                    placeholder="Pilih Kriteria Penilaian"
                    isLoading={isLoadingKriteriaPenilaianOptions || isLoading}
                    isDisabled={
                      isLoadingKriteriaPenilaianOptions || !isEdit || isLoading
                    }
                    isError={kriteria_penilaian_id}
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
