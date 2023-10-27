import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./ManageQuiz.scss";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  postCreateNewQuiz,
} from "../../../../service/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [decription, setDecription] = useState("");
  const [type, setType] = useState({ label: "EASY", value: "EASY" });
  const [image, setImage] = useState();
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [dataDel, setDataDel] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files["0"]) {
      setImage(e.target.files["0"]);
    }
  };
  useEffect(() => {
    fetchAllQuiz();
  }, []);
  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleSubmit = async () => {
    if (!name || !decription) {
      toast.error("Name/Decription is required");
      return;
    }
    let data = await postCreateNewQuiz(decription, name, type.value, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setName("");
      setType({ label: "EASY", value: "EASY" });
      setDecription("");
      setImage("");
      fetchAllQuiz();
    } else {
      toast.error(data.EM);
    }
  };
  const handleDelteQuiz = (data) => {
    if (data) {
      setShowModalDeleteQuiz(true);
      setDataDel(data);
    } else {
      toast.error("Not data user");
    }
  };
  const handleIUpdateQuiz = (data) => {
    if (data) {
      setShowModalUpdateQuiz(true);
      setUpdateData(data);
    } else {
      toast.error("Not data user");
    }
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title">Manage Quiz</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new Quiz:
                </legend>
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
                <div className="more-actions form-group">
                  <label className="mb-1">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleChangeFile(e)}
                  ></input>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-datail">
        <TableQuiz
          listQuiz={listQuiz}
          handleDelteQuiz={handleDelteQuiz}
          handleIUpdateQuiz={handleIUpdateQuiz}
        />
      </div>
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDelete={dataDel}
        fetchAllQuiz={fetchAllQuiz}
      />
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdate={updateData}
        fetchAllQuiz={fetchAllQuiz}
      />
    </div>
  );
};
export default ManageQuiz;
