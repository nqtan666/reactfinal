import { useEffect, useState } from "react";
import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUsers, getUserWithPaginate } from "../../../service/apiServices";
import ModelDeleteUser from "./ModelDeleteUser";
import { toast } from "react-toastify";
import ModelViewUser from "./ModelViewUser";
import ModelUpdateUser from "./ModelUpdateUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {
  const LIMIT_USER = 1;
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModelDelUser, setShowModelDelUser] = useState(false);
  const [showModelViewUser, setShowModelViewUser] = useState(false);
  const [showModelUpdateUser, setShowModelUpdateUser] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [listUsers, setListUsers] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);

  useEffect(() => {
    fetchAllUserWithPaginate(page);
  }, []);

  const fetchAllUser = async () => {
    let data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT);
    }
  };
  const fetchAllUserWithPaginate = async (page) => {
    let data = await getUserWithPaginate(page, LIMIT_USER);
    if (data.EC === 0) {
      console.log("check paginate", data);
      setListUsers(data.DT.users);
      setTotalPage(data.DT.totalPages);
    }
  };
  const handleShowModelCreateUser = () => setShowModelCreateUser(true);

  const handleClickBtnDel = (data) => {
    if (data) {
      setShowModelDelUser(true);
      setDataSelect(data);
    } else {
      toast.error("Not data user");
    }
  };

  const handleClickBtnView = (data) => {
    if (data) {
      setShowModelViewUser(true);
      setDataSelect(data);
    } else {
      toast.error("Not data user");
    }
  };
  const handleClickBtnUpdate = (data) => {
    if (data) {
      setShowModelUpdateUser(true);
      setDataUpdate(data);
    } else {
      toast.error("Not data user");
    }
  };
  return (
    <div className="manage-user-container">
      <div className="title">ManageUser</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => handleShowModelCreateUser()}
          >
            <FcPlus />
            Add user
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnDel={handleClickBtnDel}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnUpdate={handleClickBtnUpdate} 
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnDel={handleClickBtnDel}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnUpdate={handleClickBtnUpdate}
            page={page}
            setPage={setPage}
            totalPage={totalPage}
            fetchAllUserWithPaginate={fetchAllUserWithPaginate}
          />
        </div>
        <ModelCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
          fetchAllUser={fetchAllUser}
          page={page}
          fetchAllUserWithPaginate={fetchAllUserWithPaginate}
        />
        <ModelUpdateUser
          show={showModelUpdateUser}
          setShow={setShowModelUpdateUser}
          fetchAllUser={fetchAllUser}
          dataUpdate={dataUpdate}
          page={page}
          fetchAllUserWithPaginate={fetchAllUserWithPaginate}
        />
        <ModelDeleteUser
          show={showModelDelUser}
          setShow={setShowModelDelUser}
          dataDelete={dataSelect}
          fetchAllUser={fetchAllUser}
          fetchAllUserWithPaginate={fetchAllUserWithPaginate}
          setPage={setPage}
        />
        <ModelViewUser
          show={showModelViewUser}
          setShow={setShowModelViewUser}
          dataViewUser={dataSelect}
        />
      </div>
    </div>
  );
};
export default ManageUser;
