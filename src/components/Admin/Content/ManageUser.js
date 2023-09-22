import { useState } from "react";
import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";

const ManageUser = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
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
        <div className="table-users-container">table users</div>
        <ModelCreateUser show={show} setShow = {setShow}/>
      </div>
    </div>
  );
};
export default ManageUser;
