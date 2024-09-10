"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { BasePageTitle } from "@/components/base-page-title";
import { PageWrapper } from "@/components/page-wrapper";
import { InputWithIcon } from "@/components/ui/input";
import { SearchIcon } from "@/components/svg/search";
import { useColumnTable } from "./components/column-definition";
import { DataTable } from "@/components/data-table";
import { useGetAllTrashDesa } from "@/handlers/wilayah/desa/trash/get-all-trash-desa";

const initialValues: QueryParamsDesa = {
  pageIndex: 0,
  pageSize: null,
  nama: "",
  kode: null,
  kecamatan_id: null,
};

export default function TrashDesaPage() {
  const [queryParams, setQueryParams] =
    useState<QueryParamsDesa>(initialValues);

  const { data, isLoading } = useGetAllTrashDesa(queryParams);

  const { columns } = useColumnTable();

  const handleSearch = useDebouncedCallback((value) => {
    setQueryParams((prev) => ({ ...prev, nama: value }));
  }, 1000);

  const setPage = (value: number) => {
    setQueryParams((prev) => ({ ...prev, pageIndex: value }));
  };

  return (
    <PageWrapper>
      <Link href="/wilayah/desa" className="mb-2">
        <button
          className="flex items-center gap-1 text-sm"
          title="Kembali ke halaman sebelumnya"
        >
          <ArrowLeft className="h-5 w-5" />
          <p>Kembali</p>
        </button>
      </Link>
      <BasePageTitle title="Daftar Trash Desa" />
      <InputWithIcon
        id="nama"
        placeholder="Cari nama"
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
