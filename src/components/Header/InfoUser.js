import { FaArrowCircleUp } from "react-icons/fa";
import "./InfoUser.scss";
const InfoUser = () => {
  return (
    <>
      <div className="info-user">
        <div className="row">
          <div className="col-4">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              // value={username}
              // onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              // value={email}
              disabled
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label>Role</label>
            <select
              className="form-control"
              // onChange={(e) => setRole(e.target.value)}
              disabled
            >
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
              // onChange={(e) => handelUploadImage(e)}
            />
          </div>
          <div className="col-12">
            <div className=" col-md-12 img-preview">
              {/* {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )} */}
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-success mt-2">Update</button>
        </div>
      </div>
    </>
  );
};
export default InfoUser;
