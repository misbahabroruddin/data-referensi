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
import { useGetAllTrashInformasi } from "@/handlers/berita/informasi/trash/get-all-informasi";

const initialValues: QueryParamsInformasi = {
  pageIndex: 0,
  pageSize: null,
  judul: "",
};

export default function TrashInformasiPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsInformasi>(initialValues);

  const { data, isLoading } = useGetAllTrashInformasi(queryParams);

  const { columns } = useColumnTable();

  const handleSearch = useDebouncedCallback((value) => {
    setQueryParams((prev) => ({ ...prev, judul: value }));
  }, 1000);

  const setPage = (value: number) => {
    setQueryParams((prev) => ({ ...prev, pageIndex: value }));
  };

  return (
    <PageWrapper>
      <Link href="/berita/informasi" className="mb-2">
        <button
          className="flex items-center gap-1 text-sm"
          title="Kembali ke halaman sebelumnya"
        >
          <ArrowLeft className="h-5 w-5" />
          <p>Kembali</p>
        </button>
      </Link>
      <BasePageTitle title="Daftar Trash Informasi" />
      <InputWithIcon
        id="nama"
        placeholder="Cari nama judul"
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
