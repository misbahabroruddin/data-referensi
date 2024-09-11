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
import { useGetAllKebutuhanKhusus } from "@/handlers/mahasiswa/kebutuhan-khusus/get-all-kebutuhan-khusus";
import { useExportKebutuhanKhusus } from "@/handlers/mahasiswa/kebutuhan-khusus/export-kebutuhan-khusus";
import { useImportKebutuhanKhusus } from "@/handlers/mahasiswa/kebutuhan-khusus/import-kebutuhan-khusus";
import { ModalAddKebutuhanKhusus } from "./components/modal-add.kebutuhan-khusus";

const initialValues: QueryParamsKebutuhanKhusus = {
  pageIndex: 0,
  pageSize: null,
  kode: "",
  kebutuhan_khusus: "",
};

export default function KebutuhanKhususPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsKebutuhanKhusus>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataKebutuhanKhusus, isLoading: isLoadingKebutuhanKhusus } =
    useGetAllKebutuhanKhusus(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportKebutuhanKhusus();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportKebutuhanKhusus();

  const handleSearch = useDebouncedCallback((value) => {
    setQueryParams((prev) => ({ ...prev, kebutuhan_khusus: value }));
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
      FileSaver.saveAs(dataExport, "data-kebutuhan-khusus.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-kebutuhan-khusus"],
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
      <BasePageTitle title="Daftar KebutuhanKhusus" />
      <div className="mt-6 flex justify-between">
        <InputWithIcon
          id="kebutuhan_khusus"
          placeholder="Cari jenis tinggal"
          className="w-full md:w-72 lg:w-80"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<SearchIcon color="#999999" />}
        />
        <div className="flex gap-2">
          <Link href="/mahasiswa/kebutuhan-khusus/trash">
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
          <ModalAddKebutuhanKhusus />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataKebutuhanKhusus?.data}
        total={dataKebutuhanKhusus?.data?.total}
        pageCount={dataKebutuhanKhusus?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingKebutuhanKhusus}
      />
    </PageWrapper>
  );
}
