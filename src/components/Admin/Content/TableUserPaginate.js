import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import PaginatedItems from "./PaginatedItems";
const TableUserPaginate = (props) => {
  const { listUsers, setShow, page, setPage, totalPage } = props;
  const handleClickBtnDel = (item) => {
    props.handleClickBtnDel(item);
  };
  const handleClickBtnView = (item) => {
    props.handleClickBtnView(item);
  };
  const handleClickBtnUpdate = (item) => {
    props.handleClickBtnUpdate(item);
  };
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickBtnView(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDel(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers.length === 0 && (
            <tr>
              <td colSpan={4}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-pagination d-flex justify-content-center">
        <PaginatedItems
          pageCount={totalPage}
          itemsPerPage={4}
          setPage={setPage}
          fetchAllUserWithPaginate={props.fetchAllUserWithPaginate}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
