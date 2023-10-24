import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../service/apiServices";
import { toast } from "react-toastify";
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
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files["0"]) {
      setImage(e.target.files["0"]);
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
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <hr />
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
              defaultValue={type}
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
            <button className="btn btn-warning" onClick={() => handleSubmit()}>
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-datail">Table</div>
    </div>
  );
};
export default ManageQuiz;
