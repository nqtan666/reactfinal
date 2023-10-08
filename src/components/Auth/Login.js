import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FaSpinner } from "react-icons/fa";
import { set } from "lodash";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    // validate
    let res = await postLogin(email, password);
    if (res && res.EC === 0) {
      dispatch(doLogin(res));
      toast.success(res.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };
  const handleGotoHome = () => {
    navigate("/");
  };
  const handleSignup = () => {
    navigate("/sign-up");
  };
  return (
    <>
      <div className="login-container">
        <div className="header">
          Don't have an account yet?
          <button className="btn-signin" onClick={() => handleSignup()}>
            Sign Up
          </button>
          <a
            href="https://support.typeform.com/to/IHe4NkgF?_gl=1*1nib27a*_gcl_au*MzQxMDgyOTY1LjE2OTQ4Mjc2Njc.*_ga*NDc2NzgzMDkwLjE2OTQ4Mjc2NjA.*_ga_N6F0VDRT9W*MTY5NjI1ODE3My4zLjEuMTY5NjI1ODE3Ni41Ny4wLjA.&typeform-source=admin.typeform.com#source=login_page&function=needhelp"
            className="contact"
          >
            Contact us
          </a>
        </div>
        <div className="title col-4 mx-auto">TanNQ Design</div>
        <div className="wellcome col-4 mx-auto">Hello, who’s this?</div>
        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span className="forgot-password">Forgot password?</span>
          <div>
            <button
              onClick={() => handleLogin()}
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading && <FaSpinner className="loaderIcon" />}

              <span>Login</span>
            </button>
          </div>
          <div className="goto-home" onClick={() => handleGotoHome()}>
            <i>&lt;&lt; Go to Home</i>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
