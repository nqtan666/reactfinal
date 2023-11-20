import { FaArrowCircleUp } from "react-icons/fa";
import "./InfoUser.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _, { isEmpty } from "lodash";
import { updateInfoUser } from "../../service/apiServices";
import { doChangeImage } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
const InfoUser = (props) => {
  const { setShow } = props;
  const [previewImage, setPreviewImage] = useState("");
  const [role, setRole] = useState("USER");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const account = useSelector((state) => {
    return state.user.account;
  });
  // console.log("check accout", account);
  useEffect(() => {
    if (account) {
      setRole(account.role);
      setEmail(account.email);
      setUserName(account.username);
      setImage(account.image);
      setPreviewImage(`data:image/png;base64,${account.image}`);
    }
  }, [account]);
  const updateInfo = async () => {
    //validate
    if (_.isEmpty(userName)) {
      toast.error(`Username required`);
      return;
    }
    let res = await updateInfoUser(userName, image);
    if (res.EC === 0) {
      toast.success(res.EM);
      if (image !== account.image) {
        let base64image = await toBase64(image);
        let handleBase64 = base64image.split(",")[1];
        dispatch(doChangeImage(handleBase64));
      }
      setShow(false);
    } else {
      toast.error(res.EM);
    }
  };
  const handelUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files["0"]) {
      setImage(e.target.files["0"]);
      setPreviewImage(URL.createObjectURL(e.target.files["0"]));
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  return (
    <>
      <div className="info-user">
        <div className="row">
          <div className="col-4">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              disabled
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label>Role</label>
            <select className="form-control" defaultValue={role} disabled>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label lable-upload" htmlFor="lableUpload">
              <FaArrowCircleUp />
              Upload Image
            </label>
            <input
              type="file"
              hidden
              id="lableUpload"
              onChange={(e) => handelUploadImage(e)}
            />
          </div>
          <div className="col-12">
            <div className=" col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-success mt-2" onClick={() => updateInfo()}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};
export default InfoUser;
