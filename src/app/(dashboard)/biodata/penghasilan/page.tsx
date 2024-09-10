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
import { DataTable } from "@/components/data-table";
import { useColumnTable } from "./components/column-definition";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllPenghasilan } from "@/handlers/biodata/penghasilan/get-all-penghasilan";
import { useExportPenghasilan } from "@/handlers/biodata/penghasilan/export-penghasilan";
import { useImportPenghasilan } from "@/handlers/biodata/penghasilan/import-penghasilan";
import { ModalAddPenghasilan } from "./components/modal-add-penghasilan";

const initialValues: QueryParamsPenghasilan = {
  pageIndex: 0,
  pageSize: null,
  nama: "",
};

export default function PenghasilanPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsPenghasilan>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataPenghasilan, isLoading: isLoadingPenghasilan } =
    useGetAllPenghasilan(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportPenghasilan();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportPenghasilan();

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
      FileSaver.saveAs(dataExport, "data-penghasilan.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-penghasilan"],
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
      <BasePageTitle title="Daftar Penghasilan" />
      <div className="mt-6 flex justify-between">
        <InputWithIcon
          id="nama"
          placeholder="Cari nama"
          className="w-full md:w-72 lg:w-80"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<SearchIcon color="#999999" />}
        />
        <div className="flex gap-2">
          <Link href="/biodata/penghasilan/trash">
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
          <ModalAddPenghasilan />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataPenghasilan?.data}
        total={dataPenghasilan?.data?.total}
        pageCount={dataPenghasilan?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingPenghasilan}
      />
    </PageWrapper>
  );
}