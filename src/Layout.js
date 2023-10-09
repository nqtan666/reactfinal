import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import ListQuiz from "./components/User/ListQuiz";
const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} exact>
          <Route index element={<HomePage />} />
          <Route path="/user" element={<ListQuiz />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Layout;
