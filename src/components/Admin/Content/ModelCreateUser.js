import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaArrowCircleUp } from "react-icons/fa";

function ModelCreateUser(props) {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setRole("");
    setImage("");
    setPreviewImage("");
  };
  // const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handelUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files["0"]) {
      setImage(e.target.files["0"]);
      setPreviewImage(URL.createObjectURL(e.target.files["0"]));
    }
  };
  const handlSubmitCreateUser = async () => {
    // validate

    // let data = {
    //   email : email,
    //   password :password,
    //   username :username,
    //   role :role,
    //   userImage:image,
    // }
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    let res = await axios.post(
      "http://localhost:8081/api/v1/participant",
      data
    );
    if (res.status === 200) {
      handleClose();
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add new user
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={() => handlSubmitCreateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModelCreateUser;
