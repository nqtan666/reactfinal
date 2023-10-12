import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      {data.image && (
        <div className="q-image">
          <img src={`data:image/png;base64,${data.image}`} />
        </div>
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
                  value=""
                  id={`flexCheckDefault${index}`}
                />
                <label
                  htmlFor={`flexCheckDefault${index}`}
                  className="form-check-label"
                >
                  {item.description}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Question;
