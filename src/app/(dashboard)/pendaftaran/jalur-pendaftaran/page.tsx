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
import { useGetAllJalurPendaftaran } from "@/handlers/pendaftaran/jalur-pendaftaran/get-all-jalur-pendaftaran";
import { useExportJalurPendaftaran } from "@/handlers/pendaftaran/jalur-pendaftaran/export-jalur-pendaftaran";
import { useImportJalurPendaftaran } from "@/handlers/pendaftaran/jalur-pendaftaran/import-jalur-pendaftaran";
import { ModalAddJalurPendaftaran } from "./components/modal-add-jalur-pendaftaran";

const initialValues: QueryParamsJalurPendaftaran = {
  pageIndex: 0,
  pageSize: null,
  jalur_pendaftaran: "",
};

export default function JalurPendaftaranPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsJalurPendaftaran>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataJalurPendaftaran, isLoading: isLoadingJalurPendaftaran } =
    useGetAllJalurPendaftaran(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportJalurPendaftaran();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportJalurPendaftaran();

  const handleSearch = useDebouncedCallback((value) => {
    setQueryParams((prev) => ({ ...prev, jalur_pendaftaran: value }));
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
      FileSaver.saveAs(dataExport, "data-jalur-pendaftaran.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-jalur-pendaftaran"],
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
      <BasePageTitle title="Daftar Jalur Pendaftaran" />
      <div className="mt-6 flex justify-between">
        <InputWithIcon
          id="jalur_pendaftaran"
          placeholder="Cari jalur pendaftaran"
          className="w-full md:w-72 lg:w-80"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<SearchIcon color="#999999" />}
        />
        <div className="flex gap-2">
          <Link href="/pendaftaran/jalur-pendaftaran/trash">
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
          <ModalAddJalurPendaftaran />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataJalurPendaftaran?.data}
        total={dataJalurPendaftaran?.data?.total}
        pageCount={dataJalurPendaftaran?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingJalurPendaftaran}
      />
    </PageWrapper>
  );
}
