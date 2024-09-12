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
import { useCreateJenisProgram } from "@/handlers/pendaftaran/jenis-program/create-jenis-program";
import { Switch } from "@/components/ui/switch";

export const ModalAddJenisProgram: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    mutateAsync: onSubmitJenisProgram,
    isPending: isLoadingSubmit,
    isSuccess,
  } = useCreateJenisProgram();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jenis_program: "",
      is_ipc: false,
      kode: "",
    },
  });

  const { jenis_program, is_ipc, kode } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitJenisProgram(data);
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
            Tambah Jenis Program
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
              name="jenis_program"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="jenis_program"
                  >
                    Jenis Program{" "}
                    <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="jenis_program"
                      className={cn(
                        "col-span-6 rounded-lg",
                        jenis_program && validationErrorClass,
                      )}
                      placeholder="Jenis Program"
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
              name="is_ipc"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center">
                  <FormLabel
                    className="col-span-6 text-sm text-black-07"
                    htmlFor="is_ipc"
                  >
                    IPC <span className="text-xs text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
