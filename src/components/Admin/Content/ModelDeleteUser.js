import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../service/apiServices";
import { toast } from "react-toastify";

function ModelDeleteUser(props) {
  const { show, setShow, dataDelete, setPage } = props;
  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setPage(1);
      await props.fetchAllUserWithPaginate(1);
    }
    if (data && data.EC != 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user. Email ={" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelDeleteUser;
