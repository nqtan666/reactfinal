import _ from "lodash";
import { useState, useEffect } from "react";
import Lightbox from "react-awesome-lightbox";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
const Question = (props) => {
  const { data, index, isShowAnswers } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  if (_.isEmpty(data)) {
    return;
  }
  const hanldeCheckBox = (aId, qId) => {
    props.handleCheckBox(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/png;base64,${data.image}`}
            onClick={() => setIsPreviewImage(true)}
            alt=""
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/png;base64,${data.image}`}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDecription} ?
      </div>
      <div className="answer">
        {data.answers.map((item, index) => {
          return (
            <div key={`answer-${index}`} className="a-child">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item.isSelected}
                  onChange={() => hanldeCheckBox(item.id, data.questionId)}
                  id={`flexCheckDefault${index}`}
                />
                <label
                  htmlFor={`flexCheckDefault${index}`}
                  className="form-check-label"
                >
                  {item.description}
                </label>
                {isShowAnswers === true && (
                  <>
                    {item.isSelected === true && item.isCorrect === true && (
                      <FiCheck className="answer-true" />
                    )}
                    {item.isCorrect === false &&  <FiX className="answer-false" />}
                    {item.isSelected === false && item.isCorrect === true && (
                      <FiCheck className="answer-true" />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Question;
