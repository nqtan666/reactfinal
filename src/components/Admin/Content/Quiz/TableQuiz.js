const TableQuiz = (props) => {
  const { listQuiz } = props;
  const handleClickBtnUpdate = (item) => {};
  const handleClickBtnDel = (item) => {};
  return (
    <div className="mt-3">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Decription</th>
            <th scope="col">Level</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <img
                      style={{ width: "100px" }}
                      src={`data:image/png;base64,${item.image}`}
                      alt="img"
                    ></img>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDel(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listQuiz.length === 0 && (
            <tr>
              <td colSpan={4}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TableQuiz;
