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
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import { useSelector } from "react-redux";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Suspense } from "react";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      <strong>404</strong> Not found data with URL
    </div>
  );
};
const Layout = (props) => {
  return (
    <Suspense fallback="...is loading">
      <Routes>
        <Route path="/" element={<App />} exact>
          <Route index element={<HomePage />} />
          <Route
            path="/user"
            element={
              <PrivateRoutes>
                <ListQuiz />
              </PrivateRoutes>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route
          path="/admins"
          element={
            <PrivateRoutes>
              <Admin />
            </PrivateRoutes>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<PrivateRoutes />} />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

export default Layout;
