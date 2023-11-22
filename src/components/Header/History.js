import { useState, useEffect } from "react";
import { getHistory } from "../../service/apiServices";
import moment from "moment";
const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    let res = await getHistory();

    if (res.DT && res.DT.data) {
      let dataNew = res.DT.data.map((data) => {
        return {
          id: data.id,
          total_questions: data.total_questions,
          total_correct: data.total_correct,
          date: moment(data.createdAt).format("YYYY-MM-DD"),
          name: data.quizHistory.name,
        };
      });
      if (dataNew.length > 7) {
        dataNew = dataNew.slice(dataNew.length - 7, dataNew.length);
      }
      setHistory(dataNew);
    }
  };
  console.log("check history", history);
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Question</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.length > 0 &&
            history.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default History;
