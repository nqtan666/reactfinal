import ReactPaginate from "react-paginate";
import { useState } from "react";
const PaginatedItems = (props) => {
  const handlePageClick = (e) => {
    props.fetchAllUserWithPaginate(+e.selected + 1);
    props.setPage(+e.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={(e) => handlePageClick(e)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={props.pageCount}
        previousLabel="< Pre"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={props.page - 1}
      />
    </>
  );
};
export default PaginatedItems;
