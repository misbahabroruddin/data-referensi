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
import { useGetAllPenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/get-all-penilaian-rapor";
import { useExportPenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/export-penilaian-rapor";
import { useImportPenilaianRapor } from "@/handlers/seleksi/penilaian-rapor/import-penilaian-rapor";
import { ModalAddPenilaianRapor } from "./components/modal-add-penilaian-rapor";

const initialValues: QueryParamsPenilaianRapor = {
  pageIndex: 0,
  pageSize: null,
  nama: "",
  kode: null,
};

export default function PenilaianRaporPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsPenilaianRapor>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataPenilaianRapor, isLoading: isLoadingPenilaianRapor } =
    useGetAllPenilaianRapor(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportPenilaianRapor();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportPenilaianRapor();

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
      FileSaver.saveAs(dataExport, "data-penilain-rapor.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-penilain-rapor"],
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
      <BasePageTitle title="Daftar Penilaian Rapor" />
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
          <Link href="/seleksi/penilaian-rapor/trash">
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
          <ModalAddPenilaianRapor />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataPenilaianRapor?.data}
        total={dataPenilaianRapor?.data?.total}
        pageCount={dataPenilaianRapor?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingPenilaianRapor}
      />
    </PageWrapper>
  );
}
