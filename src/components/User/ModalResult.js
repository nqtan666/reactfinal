import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function ModalResult(props) {
  const {
    show,
    setShow,
    dataModalResult,
    setIsDisableFinish,
    setIsShowAnswers,
  } = props;
  const handleClose = () => {
    setShow(false);
    setIsDisableFinish(true);
  };
  const handleShowAnswers = () => {
    setShow(false);
    setIsDisableFinish(true);
    setIsShowAnswers(true);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            Total Question: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct Answers: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleShowAnswers()}>
            Show Answers
          </Button>
          <Button variant="danger" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
