import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaArrowCircleUp } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatCreateNewUser } from "../../../service/apiServices";
import _ from "lodash";
function ModelUpdateUser(props) {
  const { show, setShow, dataUpdate, page } = props;
  const handleClose = () => {
    setShow(false);
  };
  // const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUserName(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage();
      setPreviewImage(`data:image/png;base64,${dataUpdate.image}`);
    }
  }, [dataUpdate]);
  const handelUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files["0"]) {
      setImage(e.target.files["0"]);
      setPreviewImage(URL.createObjectURL(e.target.files["0"]));
    }
  };
  const handlSubmitUpdateUser = async () => {
    let data = await updatCreateNewUser(dataUpdate.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await props.fetchAllUserWithPaginate(page);

      handleClose();
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" col-md-6">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                disabled
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>UserName</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className=" col-md-4">
              <label>Role</label>
              <select
                className="form-control"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className=" col-md-12">
              <label className="form-label lable-upload" htmlFor="lableUpload">
                <FaArrowCircleUp />
                Upload Image
              </label>
              <input
                type="file"
                hidden
                id="lableUpload"
                onChange={(e) => handelUploadImage(e)}
              />
            </div>
            <div className=" col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlSubmitUpdateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModelUpdateUser;
