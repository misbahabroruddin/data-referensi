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
import { useGetAllDesa } from "@/handlers/wilayah/desa/get-all-desa";
import { useExportDesa } from "@/handlers/wilayah/desa/export-desa";
import { useImportDesa } from "@/handlers/wilayah/desa/import-desa";
import { ModalAddDesa } from "./components/modal-add-desa";

const initialValues: QueryParamsDesa = {
  pageIndex: 0,
  pageSize: null,
  nama: "",
  kode: null,
  kecamatan_id: null,
};

export default function DesaPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsDesa>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataDesa, isLoading: isLoadingDesa } =
    useGetAllDesa(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportDesa();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportDesa();

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
      FileSaver.saveAs(dataExport, "data-desa.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-desa"],
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
      <BasePageTitle title="Daftar Desa" />
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
          <Link href="/wilayah/desa/trash">
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
          <ModalAddDesa />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataDesa?.data}
        total={dataDesa?.data?.total}
        pageCount={dataDesa?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingDesa}
      />
    </PageWrapper>
  );
}
