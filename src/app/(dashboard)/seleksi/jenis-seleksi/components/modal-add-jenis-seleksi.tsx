"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { useCreateJenisSeleksi } from "@/handlers/seleksi/jenis-seleksi/create-jenis-seleksi";

export const ModalAddJenisSeleksi: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitJenisSeleksi,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useCreateJenisSeleksi();

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

  const { nama, kelulusan, kode } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitJenisSeleksi(data);
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
        <Button variant="outline" className="h-10 w-32 rounded px-4 py-[9.5]">
          <PlusIcon className="mr-1 h-5 w-5" />
          Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Tambah Jenis Seleksi
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
                        "col-span-6 rounded-lg",
                        nama && validationErrorClass,
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
                        "col-span-6 rounded-lg",
                        kelulusan && validationErrorClass,
                      )}
                      placeholder="Kelulusan"
                      tabIndex={1}
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
                      />
                    </FormControl>
                    <FormMessage className="col-span-6 mt-0" />
                  </FormItem>
                )}
              />
            </div>
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
