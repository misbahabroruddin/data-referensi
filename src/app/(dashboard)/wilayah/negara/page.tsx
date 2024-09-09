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
import { useColumnTable } from "./components/column-defintion";
import { useGetAllNegara } from "@/handlers/wilayah/negara/get-all-negara";
import { useExportNegara } from "@/handlers/wilayah/negara/export-negara";
import { useImportNegara } from "@/handlers/wilayah/negara/import-negara";
import { Spinner } from "@/components/ui/spinner";
import { ModalAddNegara } from "./components/modal-add.negara";
import { DataTable } from "@/components/data-table";

const initialValues: QueryParamsNegara = {
  pageIndex: 0,
  pageSize: null,
  nama: "",
};

export default function NegaraPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsNegara>(initialValues);

  const queryClient = useQueryClient();

  const { columns } = useColumnTable();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: dataNegara, isLoading: isLoadingNegara } =
    useGetAllNegara(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportNegara();

  const {
    mutateAsync: onImportFile,
    isPending: isLoadingImportFile,
    isSuccess: isSuccessImportFile,
  } = useImportNegara();

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
      FileSaver.saveAs(dataExport, "data-negara.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-negara"],
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
      <BasePageTitle title="Daftar Negara" />
      <div className="mt-6 flex justify-between">
        <InputWithIcon
          id="nama"
          placeholder="Cari nama"
          className="w-full md:w-72 lg:w-80"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<SearchIcon color="#999999" />}
        />
        <div className="flex gap-2">
          <Link href="/wilayah/negara/trash">
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
          <ModalAddNegara />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={dataNegara?.data}
        total={dataNegara?.data?.total}
        pageCount={dataNegara?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoadingNegara}
      />
    </PageWrapper>
  );
}
