"use client";

import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { SelectComponent } from "@/components/ui/select";
import { useCreatePenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/create-penilaian-rapor";
import { useSearchMataPelajaran } from "@/handlers/seleksi/mata-pelajaran/search-mata-pelajaran";

export const ModalAddPenilaianRapor: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitPenilaianRapor,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useCreatePenilaianRapor();

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
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);
  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-8 w-8 items-center gap-1 rounded-full p-0 lg:h-10 lg:w-32 lg:rounded lg:px-4 lg:py-[9.5]"
        >
          <PlusIcon className="h-5 w-5" />
          <p className="hidden lg:block">Tambah</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Tambah Penilaian Rapor
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
                    MataPelajaran{" "}
                    <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <SelectComponent
                    createAble={false}
                    {...field}
                    value={field.value}
                    options={mataPelajaranOptions}
                    onChange={field.onChange}
                    placeholder="Pilih MataPelajaran"
                    isLoading={isLoadingMataPelajaranOptions}
                    isDisabled={isLoadingMataPelajaranOptions}
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
                        "col-span-6 rounded-lg",
                        nama_penilaian && validationErrorClass,
                      )}
                      placeholder="Nama"
                      tabIndex={1}
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
                        "col-span-6 rounded-lg",
                        nilai && validationErrorClass,
                      )}
                      placeholder="Nilai"
                      tabIndex={1}
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
                        "col-span-6 rounded-lg",
                        kode && validationErrorClass,
                      )}
                      placeholder="Kode"
                      tabIndex={1}
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
                      className={cn("col-span-6 rounded-lg")}
                      placeholder="Keterangan"
                      tabIndex={1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-6 mt-0" />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-2">
              <Button
                type="submit"
                className="w-32 bg-blue-05 hover:bg-blue-06"
                disabled={isLoadingSubmit}
              >
                {isLoadingSubmit ? <Spinner className="h-4 w-4" /> : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
