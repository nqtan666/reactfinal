import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiServices";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
import { useState } from "react";
import ModalResult from "./ModalResult";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const { state } = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
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
    //   {
    //     "quizId": 1,
    //     "answers": [
    //         {
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         {
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //     ]
    // }
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
    } else {
      alert("some");
    }
  };
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
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            handleCheckBox={handleCheckBox}
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
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">Count down</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
