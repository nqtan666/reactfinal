import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../service/apiServices";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
import { useState } from "react";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const { state } = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
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
  console.log("check1112111", dataQuiz.length);
  console.log("check index", index);
  console.log("check data", dataQuiz);
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
            answers.push(item.answers);
          });
          return { questionID: key, answers, questionDecription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}:{state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePre()}>
            Pre
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};
export default DetailQuiz;
