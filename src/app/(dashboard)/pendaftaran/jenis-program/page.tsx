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
import { useGetAllJenisProgram } from "@/handlers/pendaftaran/jenis-program/get-all-jenis-program";
import { useExportJenisProgram } from "@/handlers/pendaftaran/jenis-program/export-jenis-program";
import { useImportJenisProgram } from "@/handlers/pendaftaran/jenis-program/import-jenis-program";
import { ModalAddJenisProgram } from "./components/modal-add-jenis-program";

const initialValues: QueryParamsJenisProgram = {
  pageIndex: 0,
  pageSize: null,
  jenis_program: "",
};

export default function JenisProgramPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsJenisProgram>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataJenisProgram, isLoading: isLoadingJenisProgram } =
    useGetAllJenisProgram(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportJenisProgram();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportJenisProgram();

  const handleSearch = useDebouncedCallback((value) => {
    setQueryParams((prev) => ({ ...prev, jenis_program: value }));
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
      FileSaver.saveAs(dataExport, "data-jenis-program.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-jenis-program"],
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
      <BasePageTitle title="Daftar Jenis Program" />
      <div className="mt-6 flex justify-between">
        <InputWithIcon
          id="jenis_program"
          placeholder="Cari jenis program"
          className="w-full md:w-72 lg:w-80"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<SearchIcon color="#999999" />}
        />
        <div className="flex gap-2">
          <Link href="/pendaftaran/jenis-program/trash">
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
          <ModalAddJenisProgram />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataJenisProgram?.data}
        total={dataJenisProgram?.data?.total}
        pageCount={dataJenisProgram?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingJenisProgram}
      />
    </PageWrapper>
  );
}
