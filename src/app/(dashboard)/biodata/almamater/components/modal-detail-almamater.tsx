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
import { useUpdateAlmamater } from "@/handlers/biodata/almamater/update-almamater";
import { useGetDetailAlmamater } from "@/handlers/biodata/almamater/get-detail-almamater";

export const ModalDetailAlmamater: React.FC<{
  isEdit?: boolean;
  almamaterId: string;
}> = ({ isEdit = false, almamaterId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitAlmamater,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useUpdateAlmamater(almamaterId);

  const {
    data: detailAlmamater,
    refetch: getDetailAlmamater,
    isLoading,
  } = useGetDetailAlmamater(almamaterId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ukuran: "",
      kode: "",
      lingkar_dada: "",
      panjang_badan: "",
      panjang_lengan: "",
    },
  });

  const { ukuran, kode, lingkar_dada, panjang_badan, panjang_lengan } =
    form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitAlmamater(data);
  };

  useEffect(() => {
    if (isModalOpen) {
      getDetailAlmamater();
      form.setValue("ukuran", detailAlmamater?.data?.ukuran);
      form.setValue("kode", detailAlmamater?.data?.kode);
      form.setValue("lingkar_dada", detailAlmamater?.data?.lingkar_dada);
      form.setValue("panjang_badan", detailAlmamater?.data?.panjang_badan);
      form.setValue("panjang_lengan", detailAlmamater?.data?.panjang_lengan);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      form.reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    form.setValue("ukuran", detailAlmamater?.data?.ukuran);
    form.setValue("kode", detailAlmamater?.data?.kode);
    form.setValue("lingkar_dada", detailAlmamater?.data?.lingkar_dada);
    form.setValue("panjang_badan", detailAlmamater?.data?.panjang_badan);
    form.setValue("panjang_lengan", detailAlmamater?.data?.panjang_lengan);
  }, [detailAlmamater]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger title={isEdit ? "Edit" : "Detail"}>
        {isEdit ? <EditIcon /> : <EyeIcon />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Ubah" : "Detail"} Almamater
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
                    Kode
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
              name="ukuran"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="ukuran"
                  >
                    Ukuran
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="ukuran"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        ukuran && validationErrorClass,
                      )}
                      placeholder="Ukuran"
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
              name="lingkar_dada"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="lingkar_dada"
                  >
                    Lingkar Dada
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="lingkar_dada"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        lingkar_dada && validationErrorClass,
                      )}
                      placeholder="Lingkar Dada"
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
              name="panjang_lengan"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="panjang_lengan"
                  >
                    Panjang Lengan
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="panjang_lengan"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        panjang_lengan && validationErrorClass,
                      )}
                      placeholder="Panjang Lengan"
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
              name="panjang_badan"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="panjang_badan"
                  >
                    Panjang Badan
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="panjang_badan"
                      className={cn(
                        "col-span-6 rounded-lg disabled:cursor-default disabled:opacity-100",
                        panjang_badan && validationErrorClass,
                      )}
                      placeholder="Panjang Badan"
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
