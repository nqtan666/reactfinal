import { useState } from "react";
import { useEffect } from "react";
import { getQuizByUser } from "../../service/apiServices";
import { useNavigate, NavLink } from "react-router-dom";
import "./ListQuiz.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
const ListQuiz = () => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let data = await getQuizByUser();
    if (data && data.EC === 0) {
      setArrQuiz(data.DT);
    }
  };
  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="#">
          <NavLink to="/" className="navbar-brand">
            Home
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          <NavLink to="/user" className="navbar-brand">
            Users
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>ListQuiz</Breadcrumb.Item>
      </Breadcrumb>
      <div className="list-quiz-container">
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((quiz, index) => {
            return (
              <div
                key={`${index}-quiz`}
                className="card"
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src={`data:image/jpeg;base64,${quiz.image}`}
                  alt="img"
                />
                <div className="card-body">
                  <h5 className="card-title">Quiz {index + 1}</h5>
                  <p className="card-text">{quiz.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/quiz/${quiz.id}`, {
                        state: { quizTitle: quiz.description },
                      })
                    }
                  >
                    Start Now
                  </button>
                </div>
              </div>
            );
          })}
        {arrQuiz && arrQuiz.length === 0 && (
          <div>You don't have any quiz now...</div>
        )}
      </div>
    </>
  );
};
export default ListQuiz;
