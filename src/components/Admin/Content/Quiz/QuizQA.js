import Select from "react-select";
import { useState, useEffect } from "react";
import "./QuizQA.scss";
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
  getQuizWithQA,
  postUpdateQA,
  deleteQuestionOfQuiz,
} from "../../../../service/apiServices";

const QuizQA = (props) => {
  const initQuestions = {
    id: uuidv4(),
    description: "",
    imageFile: "",
    imageName: "",
    answers: [{ id: uuidv4(), description: "", isCorrect: false }],
  };
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [questions, setQuestions] = useState([initQuestions]);

  const [listQuiz, setListQuiz] = useState([]);
  const [selectQuiz, setSelectQuiz] = useState({});
  useEffect(() => {
    fetchAllQuiz();
  }, [props.listQuiz]);
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
  useEffect(() => {
    if (selectQuiz && selectQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectQuiz]);
  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectQuiz.value);
    if (res.EC === 0) {
      //convert base 64 to file
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Questions-${q.id}`;
          res.DT.qa[i].imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Questions-${q.id}`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };
  const hanldeAddRemoveQuestion = async (type, idQuestion) => {
    if (type === "ADD") {
      setQuestions([...questions, initQuestions]);
    }
    if (type == "REMOVE") {
      if (questions.length - 1 === 0) {
        toast.error("Please not delete");
      }
      // call api
      let res = await deleteQuestionOfQuiz(idQuestion, selectQuiz.value);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        fetchQuizWithQA();
      } else {
        toast.error(res.EM);
      }
    }
  };
  const handleAddRemoveAnswer = (type, idQuestion, idAnswer) => {
    let dataClone = _.cloneDeep(questions);
    let index = questions.findIndex((question) => question.id === idQuestion);
    if (type === "ADD") {
      let dataAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      if (index > -1) {
        dataClone[index].answers.push(dataAnswer);

        setQuestions(dataClone);
      }
    }
    if (type === "REMOVE") {
      if (index > -1) {
        dataClone[index].answers = dataClone[index].answers.filter(
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
      dataClone[index].answers = dataClone[index].answers.map((answer) => {
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
    if (_.isEmpty(selectQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }
    // validate answer
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          indexA = j;
          isValidAnswer = false;
          break;
        }
        if (!isValidAnswer) {
          indexQ = i;
          break;
        }
      }
    }
    if (!isValidAnswer) {
      toast.error(`Not empty answer ${+indexA + 1} at question ${+indexQ + 1}`);
      return;
    }

    // validate question
    let isValidQ = true;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ = i;
        break;
      }
    }
    if (!isValidQ) {
      toast.error(`Not empty description for question ${+indexQ + 1}`);
      return;
    }
    //validate isCorrect for answers
    let isCorrect = true;
    for (let i = 0; i < questions.length; i++) {
      let tmp = 0;
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (questions[i].answers[j].isCorrect) {
          tmp++;
        }
      }
      if (tmp === 0) {
        isCorrect = false;
        indexQ = i;
        break;
      }
    }
    if (!isCorrect) {
      toast.error(`Not is correct at question ${+indexQ + 1}`);
      return;
    }
    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }
    let res = await postUpdateQA({
      quizId: selectQuiz.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    } else {
      toast.error(res.EM);
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

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
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, key) => {
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
                            value={answer.description}
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
                          {question.answers.length > 1 && (
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
export default QuizQA;
