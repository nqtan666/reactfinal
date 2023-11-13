import { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import { postRegister } from "../../service/apiServices";
import Language from "../Header/Language";
const Signup = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const validateEmail = (email) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email) == false) {
      return false;
    }

    return true;
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSubmit = async () => {
    let isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email Address ");
      return;
    }
    if (_.isEmpty(username)) {
      toast.error("Invalid UserName Address ");
      return;
    }
    if (_.isEmpty(password)) {
      toast.error("Invalid password Address ");
      return;
    }
    if (repassword !== password) {
      toast.error("incorrect repassword ");
      return;
    }
    let res = await postRegister(email, username, password);
    if (res && res.EC == 0) {
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="signup-container">
        <div className="header">
          Have an account yet?
          <button className="btn-login" onClick={() => handleLogin()}>
            Login
          </button>
          <a
            href="https://support.typeform.com/to/IHe4NkgF?_gl=1*1nib27a*_gcl_au*MzQxMDgyOTY1LjE2OTQ4Mjc2Njc.*_ga*NDc2NzgzMDkwLjE2OTQ4Mjc2NjA.*_ga_N6F0VDRT9W*MTY5NjI1ODE3My4zLjEuMTY5NjI1ODE3Ni41Ny4wLjA.&typeform-source=admin.typeform.com#source=login_page&function=needhelp"
            className="contact"
          >
            Contact us
          </a>
          <Language />
        </div>
        <div className="title col-4 mx-auto">Register Account</div>
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
            <label>Username</label>
            <input
              type="email"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="form-group">
            <label>Re-Password</label>
            <input
              type="password"
              className="form-control"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>
          <div>
            <button lassName="btn-submit " onClick={() => handleSubmit()}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
