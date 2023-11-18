const ChangePass = () => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label>New password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>New password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="col-6"
          style={{ display: "flex", alignItems: "center", marginTop: "25px" }}
        >
          <button className="btn btn-warning">Change</button>
        </div>
      </div>
    </>
  );
};
export default ChangePass;
