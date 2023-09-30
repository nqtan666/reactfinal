import { useEffect, useState } from "react";
import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../service/apiServices";
import ModelDeleteUser from "./ModelDeleteUser";
import { toast } from "react-toastify";
import ModelViewUser from "./ModelViewUser";

const ManageUser = () => {
  const [showModelCreateUser, setShowModelCreateUser] = useState(false);
  const [showModelDelUser, setShowModelDelUser] = useState(false);
  const [showModelViewUser, setShowModelViewUser] = useState(false);

  const [listUsers, setListUsers] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
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
          <TableUser
            listUsers={listUsers}
            handleClickBtnDel={handleClickBtnDel}
            handleClickBtnView={handleClickBtnView}
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
          dataDelete={dataSelect}
          fetchAllUser={fetchAllUser}
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
