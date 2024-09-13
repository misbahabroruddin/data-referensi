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
import { useCreatePengumuman } from "@/handlers/berita/pengumuman/create-pengumuman";

export const ModalAddPengumuman: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitPengumuman,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useCreatePengumuman();

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
          <DialogTitle className="text-center">Tambah Pengumuman</DialogTitle>
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
                        "col-span-6 rounded-lg",
                        judul && validationErrorClass,
                      )}
                      placeholder="Judul"
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
                        "col-span-6 rounded-lg",
                        jenis_pendaftaran && validationErrorClass,
                      )}
                      placeholder="Jenis Pendaftaran"
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
                    Keterangan <span className="text-xs text-red-500">*</span>
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
