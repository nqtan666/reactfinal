import { useEffect, useState } from "react";
import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../service/apiServices";
import ModelDeleteUser from "./ModelDeleteUser";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModelDelUser, setShowModelDelUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);
  useEffect(() => {
    fetchAllUser();
    console.log("run run");
  }, []);

  const fetchAllUser = async () => {
    let data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT);
    }
  };
  const handleShow = () => setShowModelCreateUser(true);
  const handleClickBtnDel = (data) => {
    if (data) {
      setShowModelDelUser(true);
      setDataDelete(data);
    } else {
      toast.error("Not data user");
    }
  };
  return (
    <div className="manage-user-container">
      <div className="title">ManageUser</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={() => handleShow()}>
            <FcPlus />
            Add user
          </button>
        </div>
        <div className="table-users-container">
          <TableUser
            listUsers={listUsers}
            handleClickBtnDel={handleClickBtnDel}
          />
        </div>
        <ModelCreateUser
          show={showModelCreateUser}
          setShow={setShowModelCreateUser}
          fetchAllUser={fetchAllUser}
        />
        <ModelDeleteUser
          show={showModelDelUser}
          setShow={setShowModelDelUser}
          dataDelete={dataDelete}
          fetchAllUser={fetchAllUser}
        />
      </div>
    </div>
  );
};
export default ManageUser;
