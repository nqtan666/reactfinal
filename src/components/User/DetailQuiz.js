import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../service/apiServices";
import "./DetailQuiz.scss";
import _ from "lodash";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const { state } = useLocation();

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
          <div className="question">Question 1: How are you doing</div>
          <div className="answer">
            <div className="a-child">A.ccccc</div>
            <div className="a-child">B.ccccc</div>
            <div className="a-child">C.ccccc</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Pre</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};
export default DetailQuiz;
