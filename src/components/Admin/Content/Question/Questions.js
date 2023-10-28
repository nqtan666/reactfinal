import Select from "react-select";
import { useState, useEffect } from "react";
import "./Questions.scss";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import _ from "lodash";
import { MdClear } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const Questions = () => {
  const [selectQuiz, setSelectQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Question 1",
      imageFile: "",
      imageName: "",
      answer: [{ id: uuidv4(), description: "Ansewr 1", isCorrect: false }],
    },
  ]);
  const hanldeAddRemoveQuestion = (type, idQuestion) => {
    if (type === "ADD") {
      const data = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answer: [{ id: uuidv4(), description: "", isCorrect: false }],
      };

      setQuestions([...questions, data]);
    }
    if (type == "REMOVE") {
      let dataFilte = questions.filter(
        (question) => question.id !== idQuestion
      );
      setQuestions(dataFilte);
    }
  };
  const handleAddRemoveAnswer = (type, idQuestion, idAnswer) => {
    console.log(type);
    let dataClone = _.cloneDeep(questions);
    let index = questions.findIndex((question) => question.id === idQuestion);
    if (type === "ADD") {
      console.log(11111);
      let dataAnswer = {
        id: uuidv4(),
        description: "Ansewr 1",
        isCorrect: false,
      };
      if (index > -1) {
        dataClone[index].answer.push(dataAnswer);
        console.log(dataClone[index]);
        setQuestions(dataClone);
      }
    }
    if (type === "REMOVE") {
      if (index > -1) {
        dataClone[index].answer = dataClone[index].answer.filter(
          (item) => item.id !== idAnswer
        );
        setQuestions(dataClone);
      }
    }
  };
  console.log("checkkk quesotuon", questions);
  return (
    <div className="question-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectQuiz}
            onChange={setSelectQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add Questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-3">
                <div className="question-content">
                  <div className="form-floating description ">
                    <input
                      type="text"
                      className="form-control"
                      // value={question.description}
                    />
                    <label>Questions {index + 1} description</label>
                  </div>
                  <div className="group-upload">
                    <label className="label-up" htmlFor="uploadFile">
                      <FcAddImage />
                    </label>
                    <input id="uploadFile" type="file" hidden></input>
                    <span>0 file is uploaded</span>
                  </div>
                  <div className="btn-add">
                    <span
                      onClick={() =>
                        hanldeAddRemoveQuestion("ADD", question.id)
                      }
                    >
                      <AiOutlinePlusCircle className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          hanldeAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <AiOutlineMinusCircle className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answer &&
                  question.answer.length > 0 &&
                  question.answer.map((answer, key) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                        />
                        <div className="form-floating answer-name ">
                          <input type="text" className="form-control" />
                          <label>Answer {key + 1}</label>
                        </div>
                        <div className="btn-add">
                          <span>
                            <AiOutlinePlusCircle
                              className="icon-add"
                              onClick={() =>
                                handleAddRemoveAnswer("ADD", question.id)
                              }
                            />
                          </span>
                          {question.answer.length > 1 && (
                            <span>
                              <MdClear
                                className="icon-remove"
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    question.id,
                                    answer.id
                                  )
                                }
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Questions;
