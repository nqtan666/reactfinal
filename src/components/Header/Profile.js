import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChangePass from "./ChangePass";
import InfoUser from "./InfoUser";
import History from "./History";
function Profile(props) {
  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Quản Lý Thông Tin Người Dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            navbar={false}
            defaultActiveKey="Profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Profile" title="Profile">
              <InfoUser />
            </Tab>
            <Tab eventKey="Change PassWord" title="Change PassWord">
              <ChangePass />
            </Tab>
            <Tab eventKey="History" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
