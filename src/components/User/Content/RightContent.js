import "./RightContent.scss";
import CountDown from "./CountDown";
import { useRef } from "react";

const RightContent = (props) => {
  const { dataQuiz } = props;
  const refDiv = useRef([]);
  const onTimeUp = () => {
    props.handleFinishQuiz();
  };
  const getClassQuestion = (index, question) => {
    //check ansewer
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.some((a) => a.isSelected === true);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };
  const handClikQuestion = (index, question) => {
    props.setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item.className === "question clicked") {
          item.className = "question";
        }
      });

      if (question && question.answers.length > 0) {
        let isAnswered = question.answers.some((a) => a.isSelected === true);
        if (isAnswered) {
          return "question selected";
        }
      }
      refDiv.current[index].className = "question clicked";
    }
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((question, index) => (
            <div
              key={`question-${index}`}
              className={getClassQuestion(index, question)}
              onClick={() => handClikQuestion(index, question)}
              ref={(el) => (refDiv.current[index] = el)}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </>
  );
};
export default RightContent;
