"use client";

import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  pageOffset: number;
  onPageChange: (e: { selected: number }) => void;
}

export function Pagination({
  onPageChange,
  pageCount,
  pageOffset,
}: PaginationProps) {
  return (
    <div className="ml-auto flex items-center gap-4">
      <ReactPaginate
        breakLabel={<span className="text-blue-05 px-4">...</span>}
        nextLabel={<span className="text-blue-05 mx-2">Selanjutnya</span>}
        previousLabel={<span className="text-blue-05 mx-2">Sebelumnya</span>}
        onPageChange={onPageChange}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center border border-blue-09 lg:rounded-lg"
        pageClassName="px-2 py-1 lg:px-4 lg:py-2 border border-y-0 border-blue-09 text-blue-04"
        activeClassName="bg-blue-05 !text-white border border-blue-05"
        forcePage={pageOffset}
        marginPagesDisplayed={3}
        disableInitialCallback={true}
        nextClassName="hidden lg:list-item"
        previousClassName="hidden lg:list-item"
      />
    </div>
  );
}
