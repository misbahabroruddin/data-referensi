"use client";

import { useDebouncedCallback } from "use-debounce";
import { TrashIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { BasePageTitle } from "@/components/base-page-title";
import { PageWrapper } from "@/components/page-wrapper";
import { InputFileImport, InputWithIcon } from "@/components/ui/input";
import { SearchIcon } from "@/components/svg/search";
import { Button } from "@/components/ui/button";
import { ExportIcon } from "@/components/svg/export";
import { useColumnTable } from "./components/column-definition";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/data-table";
import { useGetAllKabupaten } from "@/handlers/wilayah/kabupaten/get-all-kabupaten";
import { useExportKabupaten } from "@/handlers/wilayah/kabupaten/export-kabupaten";
import { useImportKabupaten } from "@/handlers/wilayah/kabupaten/import-kabupaten";
import { ModalAddKabupaten } from "./components/modal-add-kabupaten";

const initialValues: QueryParamsKabupaten = {
  pageIndex: 0,
  pageSize: null,
  nama: "",
  kode: null,
  provinsi_id: null,
};

export default function KabupatenPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsKabupaten>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataKabupaten, isLoading: isLoadingKabupaten } =
    useGetAllKabupaten(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportKabupaten();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportKabupaten();

  const handleSearch = useDebouncedCallback((value) => {
    setQueryParams((prev) => ({ ...prev, nama: value }));
  }, 1000);

  const setPage = (value: number) => {
    setQueryParams((prev) => ({ ...prev, pageIndex: value }));
  };

  const handleExport = async () => {
    await refetchExport();
  };

  const handleImport = async (e: any) => {
    const file = e.target?.files[0];

    await onImportFile(file);
  };

  useEffect(() => {
    if (isSuccessExportData) {
      FileSaver.saveAs(dataExport, "data-kabupaten.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-kabupaten"],
      });
    }
  }, [dataExport]);

  useEffect(() => {
    if (isSuccessImportFile && inputFileRef.current) {
      inputFileRef.current.value = "";
      inputFileRef.current.type = "file";
    }
  }, [isSuccessImportFile]);
  return (
    <PageWrapper>
      <BasePageTitle title="Daftar Kabupaten" />
      <div className="mt-6 flex flex-wrap justify-end gap-2 lg:justify-between">
        <InputWithIcon
          id="nama"
          placeholder="Cari nama"
          className="w-full lg:w-80"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<SearchIcon color="#999999" />}
          containerInputIconClass="w-full lg:w-fit"
        />
        <div className="flex items-center justify-end gap-2">
          <Link href="/wilayah/kabupaten/trash">
            <Button
              className="flex h-8 w-8 items-center gap-1 rounded-full p-0 lg:h-10 lg:w-32 lg:rounded lg:px-4 lg:py-[9.5]"
              variant="outline"
            >
              <TrashIcon className="h-5 w-5" />
              <p className="hidden lg:block">Trash</p>
            </Button>
          </Link>
          <InputFileImport
            onChange={handleImport}
            disabled={isLoadingImportFile}
            ref={inputFileRef}
          />
          <Button
            className="flex h-8 w-8 items-center gap-1 rounded-full p-0 lg:h-10 lg:w-32 lg:rounded lg:px-4 lg:py-[9.5]"
            onClick={handleExport}
            variant="outline"
          >
            {isLoadingExportData ? (
              <>
                <Spinner className="h-4 w-4" />
                <p className="hidden lg:block">Loading</p>
              </>
            ) : (
              <>
                <ExportIcon className="h-6 w-6" color="black" />
                <p className="hidden lg:block">Export</p>
              </>
            )}
          </Button>
          <ModalAddKabupaten />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataKabupaten?.data}
        total={dataKabupaten?.data?.total}
        pageCount={dataKabupaten?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingKabupaten}
      />
    </PageWrapper>
  );
}
