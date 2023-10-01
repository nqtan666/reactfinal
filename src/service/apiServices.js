import axiosCustomize from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  console.log("checkdata>>>", data);

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
export { postCreateNewUser, getAllUsers, deleteUser, updatCreateNewUser };
