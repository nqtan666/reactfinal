import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import { FaArrowCircleUp } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { updateQuiz } from "../../../../service/apiServices";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
function ModalUpdateQuiz(props) {
  const { show, setShow, dataUpdate } = props;
  const handleClose = () => {
    setShow(false);
  };
  // const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [decription, setDecription] = useState("");
  const [type, setType] = useState({ label: "EASY", value: "EASY" });
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      console.log(dataUpdate);
      setName(dataUpdate.name);
      setDecription(dataUpdate.description);
      setType({ label: dataUpdate.difficulty, value: dataUpdate.difficulty });
      setImage(dataUpdate.image);
      setPreviewImage(`data:image/png;base64,${dataUpdate.image}`);
    }
  }, [dataUpdate]);
  const handelUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files["0"]) {
      setImage(e.target.files["0"]);
      setPreviewImage(URL.createObjectURL(e.target.files["0"]));
    }
  };
  const handleSubmit = async () => {
    let data = await updateQuiz(
      dataUpdate.id,
      decription,
      name,
      type.value,
      image
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await props.fetchAllQuiz();

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
          <Modal.Title> Add new Quiz:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-new">
            <fieldset className="border rounded-3 p-3">
              <legend className="float-none w-auto px-3">Add new Quiz:</legend>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  value={decription}
                  onChange={(e) => setDecription(e.target.value)}
                />
                <label>Description</label>
              </div>
              <div className="my-3">
                <Select
                  defaultValue={type.value}
                  onChange={setType}
                  options={options}
                  placeholder={"Quiz type"}
                />
              </div>
              <div className=" col-md-12">
                <label
                  className="form-label lable-upload"
                  htmlFor="lableUpload"
                >
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
            </fieldset>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalUpdateQuiz;
