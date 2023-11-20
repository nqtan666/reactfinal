import { useState } from "react";
import { toast } from "react-toastify";
import _, { isEmpty } from "lodash";
import { changePass } from "../../service/apiServices";
const ChangePass = (props) => {
  const { setShow } = props;
  const [passold, setPassOld] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const handleChangePass = async () => {
    //validate
    if (_.isEmpty(passold)) {
      toast.error(`Pass old required`);
      return;
    }
    if (_.isEmpty(password)) {
      toast.error(`Pass new required`);
      return;
    }
    if (_.isEmpty(repassword)) {
      toast.error(`Re pass required`);
      return;
    }
    if (repassword !== password) {
      toast.error(`Re pass and password not incorect`);
      return;
    }
    let res = await changePass(passold, password);
    if (res.EC === 0) {
      toast.success(res.EM);
      setShow(false);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-6">
          <label>Old Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={passold}
            onChange={(e) => setPassOld(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label>New password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Re password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <div
          className="col-6"
          style={{ display: "flex", alignItems: "center", marginTop: "25px" }}
        >
          <button
            className="btn btn-warning"
            onClick={() => handleChangePass()}
          >
            Change
          </button>
        </div>
      </div>
    </>
  );
};
export default ChangePass;
