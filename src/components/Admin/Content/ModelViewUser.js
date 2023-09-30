import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModelViewUser(props) {
  const { show, setShow, dataViewUser } = props;

  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} className="detail-user-container">
        <Modal.Header closeButton>
          <Modal.Title>
            Detail User :{" "}
            {dataViewUser && dataViewUser.username ? dataViewUser.username : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user-detail-container">
            <div className="img-user-detail">
              <p>Avatar</p>
              <img src="https://th.bing.com/th/id/R.47cecf6ce91d73af7900067efeaacb63?rik=%2btKMy%2fBRVLblKA&pid=ImgRaw&r=0"></img>
            </div>
            <div className="content-user-detail">
              <div>
                <span>UserName</span> :{" "}
                {dataViewUser && dataViewUser.username
                  ? dataViewUser.username
                  : ""}
              </div>
              <div>
                <span>Email</span> :
                {dataViewUser && dataViewUser.email ? dataViewUser.email : ""}
              </div>
              <div>
                <span>Role</span> :
                {dataViewUser && dataViewUser.role ? dataViewUser.role : ""}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelViewUser;
