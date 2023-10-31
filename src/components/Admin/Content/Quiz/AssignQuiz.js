import Select from "react-select";
import { useState, useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import "./AssignQuiz.scss";
import {
  getAllQuizForAdmin,
  getAllUsers,
  assignQuizForUser,
} from "../../../../service/apiServices";
const AssigQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectQuiz, setSelectQuiz] = useState({});

  const [listUsers, setListUsers] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  useEffect(() => {
    fetchAllQuiz();
    fetchAllUser();
  }, [props.listQuiz]);
  const fetchAllUser = async () => {
    let data = await getAllUsers();
    if (data.EC === 0) {
      let newUsers = data.DT.map((user) => {
        return {
          value: user.id,
          label: `${user.id}-${user.username}`,
        };
      });
      setListUsers(newUsers);
    }
  };
  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const handleAssignQuizForUser = async () => {
    if (_.isEmpty(selectQuiz) || _.isEmpty(selectUser)) {
      toast.error(`You must select`);
      return;
    }
    let res = await assignQuizForUser(selectQuiz.value, selectUser.value);
    if (res && res.EC == 0) {
      toast.success(res.EM);
      // reset
      setSelectQuiz({});
      setSelectUser({});
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-quiz-container">
      <div className="row">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectQuiz}
            onChange={setSelectQuiz}
            options={listQuiz}
          />
        </div>
        <div className="col-6 form-group">
          <label>Select Users:</label>
          <Select
            defaultValue={selectUser}
            onChange={setSelectUser}
            options={listUsers}
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => handleAssignQuizForUser()}
          className="btn btn-warning mt-3"
        >
          Assing
        </button>
      </div>
    </div>
  );
};
export default AssigQuiz;
