import Select from "react-select";
import { useState, useEffect } from "react";
import "./Questions.scss";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import _ from "lodash";
import { MdClear } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../../service/apiServices";
// const options = [
//   { value: "EASY", label: "EASY" },
//   { value: "MEDIUM", label: "MEDIUM" },
//   { value: "HARD", label: "HARD" },
// ];
const Questions = () => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answer: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ]);

  const [listQuiz, setListQuiz] = useState([]);
  const [selectQuiz, setSelectQuiz] = useState({});
  useEffect(() => {
    fetchAllQuiz();
  }, []);
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
    let dataClone = _.cloneDeep(questions);
    let index = questions.findIndex((question) => question.id === idQuestion);
    if (type === "ADD") {
      let dataAnswer = {
        id: uuidv4(),
        description: "Ansewr 1",
        isCorrect: false,
      };
      if (index > -1) {
        dataClone[index].answer.push(dataAnswer);

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
  const hanldeOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let dataClone = _.cloneDeep(questions);
      let index = questions.findIndex((question) => question.id === questionId);
      if (index > -1) {
        dataClone[index].description = value;
        setQuestions(dataClone);
      }
    }
  };
  const hanldeOnChangeFile = (questionId, e) => {
    let dataClone = _.cloneDeep(questions);
    let index = questions.findIndex((question) => question.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files["0"]) {
      dataClone[index].imageFile = e.target.files["0"];
      dataClone[index].imageName = e.target.files["0"].name;
      setQuestions(dataClone);
    }
  };
  const handleAnswerQuestion = (type, idAnswer, idQuestion, value) => {
    let dataClone = _.cloneDeep(questions);
    let index = questions.findIndex((question) => question.id === idQuestion);
    if (index > -1) {
      dataClone[index].answer = dataClone[index].answer.map((answer) => {
        if (answer.id === idAnswer) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(dataClone);
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    console.log(selectQuiz);
    //validate => todo: validate

    //submit question
    //postCreateNewQuestionForQuiz,postCreateNewAnswerForQuestion
    //submit question
    await Promise.all(
      questions.map(async (question) => {
        const q = await postCreateNewQuestionForQuiz(
          +selectQuiz.value,
          question.description,
          question.imageFile
        );
        // submit answer
        await Promise.all(
          question.answer.map(async (answer) => {
            await postCreateNewAnswerForQuestion(
              answer.description,
              answer.isCorrect,
              q.DT.id
            );
          })
        );
      })
    );
  };
  const handleImagePreview = (idQuestion) => {
    setIsPreviewImage(true);
    let dataClone = _.cloneDeep(questions);
    let index = questions.findIndex((question) => question.id === idQuestion);
    if (index > -1) {
      let image = URL.createObjectURL(dataClone[index].imageFile);
      setImagePreview(image);
    }
  };
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
            options={listQuiz}
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
                      value={question.description}
                      onChange={(event) =>
                        hanldeOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                    />
                    <label>Questions {index + 1} description</label>
                  </div>
                  <div className="group-upload">
                    <label className="label-up" htmlFor={`${question.id}`}>
                      <FcAddImage />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      hidden
                      onChange={(event) =>
                        hanldeOnChangeFile(question.id, event)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleImagePreview(question.id)}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file uploaded"
                      )}
                    </span>
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
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name ">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                e.target.value
                              )
                            }
                          />
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
                {isPreviewImage === true && (
                  <Lightbox
                    image={imagePreview}
                    title={question.imageName}
                    onClose={() => setIsPreviewImage(false)}
                  ></Lightbox>
                )}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Questions;
