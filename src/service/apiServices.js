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
  console.log(data);
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
};
