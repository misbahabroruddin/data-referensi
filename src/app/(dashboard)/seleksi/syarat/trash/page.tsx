"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { BasePageTitle } from "@/components/base-page-title";
import { DataTable } from "@/components/data-table";
import { PageWrapper } from "@/components/page-wrapper";
import { SearchIcon } from "@/components/svg/search";
import { InputWithIcon } from "@/components/ui/input";
import { useColumnTable } from "./components/column-definition";
import { useGetAllTrashSyarat } from "@/handlers/seleksi/syarat/trash/get-all-trash-syarat";

const initialValues: QueryParamsSyarat = {
  pageIndex: 0,
  pageSize: null,
  kode: "",
  nama: "",
};

export default function TrashSyaratPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsSyarat>(initialValues);

  const { data, isLoading } = useGetAllTrashSyarat(queryParams);

  const { columns } = useColumnTable();

  const handleSearch = useDebouncedCallback((value) => {
    setQueryParams((prev) => ({ ...prev, nama: value }));
  }, 1000);

  const setPage = (value: number) => {
    setQueryParams((prev) => ({ ...prev, pageIndex: value }));
  };

  return (
    <PageWrapper>
      <Link href="/seleksi/syarat" className="mb-2">
        <button
          className="flex items-center gap-1 text-sm"
          title="Kembali ke halaman sebelumnya"
        >
          <ArrowLeft className="h-5 w-5" />
          <p>Kembali</p>
        </button>
      </Link>
      <BasePageTitle title="Daftar Trash Syarat" />
      <InputWithIcon
        id="nama"
        placeholder="Cari syarat"
        className="w-full md:w-72 lg:w-80"
        onChange={(e) => handleSearch(e.target.value)}
        icon={<SearchIcon color="#999999" />}
      />
      <DataTable
        columns={columns}
        data={data?.data}
        total={data?.data?.total}
        pageCount={data?.data?.last_page}
        pagination={queryParams}
        setPagination={setPage}
        isLoading={isLoading}
      />
    </PageWrapper>
  );
}
