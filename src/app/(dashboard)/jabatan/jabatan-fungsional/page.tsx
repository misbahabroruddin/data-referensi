"use client";

import { useDebouncedCallback } from "use-debounce";
import { TrashIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { PageWrapper } from "@/components/page-wrapper";
import { BasePageTitle } from "@/components/base-page-title";
import { InputFileImport, InputWithIcon } from "@/components/ui/input";
import { SearchIcon } from "@/components/svg/search";
import { Button } from "@/components/ui/button";
import { ExportIcon } from "@/components/svg/export";
import { useColumnTable } from "./components/column-definition";
import { DataTable } from "@/components/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllJabatanFungsional } from "@/handlers/jabatan/jabatan-fungsional/get-all-jabatan-fungsional";
import { useExportJabatanFungsional } from "@/handlers/jabatan/jabatan-fungsional/export-jabatan-fungsional";
import { useImportJabatanFungsional } from "@/handlers/jabatan/jabatan-fungsional/import-jabatan-fungsional";
import { ModalAddJabatanFungsional } from "./components/modal-add-jabatan-fungsional";

const initialValues: QueryParamsJabatanFungsional = {
  pageIndex: 0,
  pageSize: null,
  nama: "",
};

export default function JabatanFungsionalPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsJabatanFungsional>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataJabatanFungsional, isLoading: isLoadingJabatanFungsional } =
    useGetAllJabatanFungsional(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportJabatanFungsional();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportJabatanFungsional();

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
      FileSaver.saveAs(dataExport, "data-jabatan-fungsional.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-jabatan-fungsional"],
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
      <BasePageTitle title="Daftar Jabatan Fungsional" />
      <div className="mt-6 flex justify-between">
        <InputWithIcon
          id="nama"
          placeholder="Cari nama"
          className="w-full md:w-72 lg:w-80"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<SearchIcon color="#999999" />}
        />
        <div className="flex gap-2">
          <Link href="/jabatan/jabatan-fungsional/trash">
            <Button
              className="h-10 w-32 rounded px-4 py-[9.5]"
              variant="outline"
            >
              <TrashIcon className="mr-2 h-5 w-5" />
              Trash
            </Button>
          </Link>
          <InputFileImport
            onChange={handleImport}
            disabled={isLoadingImportFile}
            ref={inputFileRef}
          />
          <Button
            className="h-10 w-32 rounded px-4 py-[9.5]"
            onClick={handleExport}
            variant="outline"
          >
            {isLoadingExportData ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Loading
              </>
            ) : (
              <>
                <ExportIcon className="mr-2" color="black" />
                Export
              </>
            )}
          </Button>
          <ModalAddJabatanFungsional />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataJabatanFungsional?.data}
        total={dataJabatanFungsional?.data?.total}
        pageCount={dataJabatanFungsional?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingJabatanFungsional}
      />
    </PageWrapper>
  );
}
