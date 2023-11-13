import axios from "axios";
import axiosCustomize from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axiosCustomize.post("api/v1/participant", data);
};
const updatCreateNewUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axiosCustomize.put("api/v1/participant", data);
};
const getAllUsers = () => {
  return axiosCustomize.get("api/v1/participant/all");
};
const deleteUser = (userId) => {
  return axiosCustomize.delete("/api/v1/participant", { data: { id: userId } });
};
const getUserWithPaginate = (page, limit) => {
  return axiosCustomize.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axiosCustomize.post("api/v1/login", {
    email,
    password,
  });
};
const postRegister = (email, username, password) => {
  return axiosCustomize.post("api/v1/register", { email, username, password });
};
const getQuizByUser = () => {
  return axiosCustomize.get("api/v1/quiz-by-participant");
};
const getDataQuiz = (quizId) => {
  return axiosCustomize.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};
const postSubmitQuiz = (data) => {
  return axiosCustomize.post("api/v1/quiz-submit", { ...data });
};
const postCreateNewQuiz = (decription, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", decription);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axiosCustomize.post("api/v1/quiz", data);
};
const getAllQuizForAdmin = () => {
  return axiosCustomize.get("api/v1/quiz/all");
};
const deleteQuiz = (quizId) => {
  return axiosCustomize.delete(`/api/v1/quiz/${quizId}`);
};
const updateQuiz = (id, decription, name, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", decription);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axiosCustomize.put("api/v1/quiz", data);
};
const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image);
  return axiosCustomize.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axiosCustomize.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
const assignQuizForUser = (quizId, userId) => {
  return axiosCustomize.post("/api/v1/quiz-assign-to-user", {
    quizId: quizId,
    userId: userId,
  });
};
const getQuizWithQA = (quizId) => {
  return axiosCustomize.get(`/api/v1/quiz-with-qa/${quizId}`);
};
// const postUpdateNewQuestionForQuiz = (id, quiz_id, description, image) => {
//   const data = new FormData();
//   data.append("id", id);
//   data.append("quiz_id", quiz_id);
//   data.append("description", description);
//   data.append("questionImage", image);
//   return axiosCustomize.put("api/v1/question", data);
// };
// const postUpdateNewAnswerForQuestion = (
//   description,
//   correct_answer,
//   question_id,
//   answer_id
// ) => {
//   return axiosCustomize.put("api/v1/answer", {
//     description,
//     correct_answer,
//     question_id,
//     answer_id,
//   });
// };
const postUpdateQA = (data) => {
  return axiosCustomize.post("/api/v1/quiz-upsert-qa", { ...data });
};
const deleteQuestionOfQuiz = (id, quizId) => {
  return axiosCustomize.delete("/api/v1/question", {
    data: { id: id, quizId: quizId },
  });
};
const logout = (email, refresh_token) => {
  return axiosCustomize.post("/api/v1/logout", { email, refresh_token });
};
export {
  postCreateNewUser,
  getAllUsers,
  deleteUser,
  updatCreateNewUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  deleteQuiz,
  updateQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  assignQuizForUser,
  getQuizWithQA,
  postUpdateQA,
  deleteQuestionOfQuiz,
  logout,
};
