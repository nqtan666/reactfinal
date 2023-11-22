import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiServices";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
import { useState } from "react";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const { state } = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [isDisableFinish, setIsDisableFinish] = useState(false);
  const [isShowAnswers, setIsShowAnswers] = useState(false);
  const handlePre = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleNext = () => {
    if (index + 1 < dataQuiz.length) {
      setIndex(index + 1);
    }
  };
  const handleFinishQuiz = async () => {
    let payload = { quizId: +quizId, answers: [] };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = +item.questionId;
        let userAnswerId = [];
        item.answers.forEach((ans) => {
          if (ans.isSelected) {
            userAnswerId.push(ans.id);
          }
        });
        answers.push({ questionId, userAnswerId });
      });
    }
    payload.answers = answers;
    // submit api
    let res = await postSubmitQuiz(payload);
    if (res && res.EC === 0) {
      setShowModalResult(true);
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
    }
    let dataQuizClone = _.cloneDeep(dataQuiz);
    console.log("dataQuizClone",dataQuizClone);
    let a = res.DT.quizData;
    console.log("a",a);
    for (let q of a) {
      for (let i = 0; i < dataQuizClone.length; i++) {
        // compare data systems and data usert submit exxitst question id
        if (+q.questionId === +dataQuizClone[i].questionId) {
          // looop answers data user submit
          let newAnswers = [];
          for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
            // check answer system and answer user
            // add is_correct in object as answer dataQuizClone[i].answers[j]
            let isExistAnswer = q.systemAnswers.find(
              (item) => item.id === dataQuizClone[i].answers[j].id
            );
            if (isExistAnswer) {
              // set lai bien isCorrect
              dataQuizClone[i].answers[j].isCorrect = true;
            }
            newAnswers.push(dataQuizClone[i].answers[j]);
          }
          // cap nhat lai ansers tung id
          dataQuizClone[i].answers = newAnswers;
        }
      }
    }
    //update lai state
    setDataQuiz(dataQuizClone);
  };
  console.log("check dât",dataQuiz);
  //handle checkbox
  const handleCheckBox = (answersId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    // dung find tra ve giong data con filler se tra ve 1 mang neu co => start mang tu vi tri 0
    let question = dataQuizClone.find((item) => item.questionId === questionId);
    if (question) {
      let b = question.answers.map((item) => {
        if (item.id === answersId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      // gan lai question de update vao state
      question.answers = b;
      let index = dataQuizClone.findIndex(
        (item) => item.questionId === questionId
      );
      if (index > -1) {
        dataQuizClone[index].answers = question.answers;
      }
    }
    setDataQuiz(dataQuizClone);
  };
  // useEffect
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      const data = _.chain(res.DT)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDecription = "";
          let image = "";
          value.forEach((item, index) => {
            if (index === 0) {
              questionDecription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            item.answers.isCorrect = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDecription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img alt="" />
        </div>
        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            handleCheckBox={handleCheckBox}
            isShowAnswers={isShowAnswers}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePre()}>
            Pre
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            disabled={isDisableFinish}
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          handleFinishQuiz={handleFinishQuiz}
          dataQuiz={dataQuiz}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setShowModalResult}
        setIsDisableFinish={setIsDisableFinish}
        dataModalResult={dataModalResult}
        setIsShowAnswers={setIsShowAnswers}
      />
    </div>
  );
};
export default DetailQuiz;
