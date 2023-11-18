import { useEffect, useState } from "react";
import "./DashBoard.scss";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../../service/apiServices";
import { useTranslation, Trans } from "react-i18next";
const DashBoard = () => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState();
  useEffect(() => {
    fetchDataOverView();
  }, []);
  const { t, i18n } = useTranslation();
  const fetchDataOverView = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      // data chart
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Quizz",
          Qz: Qz,
        },
        {
          name: "Question",
          Qs: Qs,
        },
        {
          name: "Answer",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };
  console.log("check data chart ", dataChart);
  return (
    <div className="dashboard-container">
      <div className="title">{t("dashboard.overview")}</div>
      <hr />
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">{t("dashboard.total-users")}</span>
            <span className="text-2">
              {dataOverView && dataOverView.users && dataOverView.users.total
                ? dataOverView.users.total
                : "0"}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.total-quiz")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz
                ? dataOverView.others.countQuiz
                : "0"}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.total-question")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions
                ? dataOverView.others.countQuestions
                : "0"}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.total-answers ")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers
                ? dataOverView.others.countAnswers
                : "0"}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="100%" height={"100%"}>
            <BarChart
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Qz"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Qs"
                fill="8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="As"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
