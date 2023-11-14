import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const HomePage = (props) => {
  const { t, i18n } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => {
    return state.user.account;
  });
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="content-title1">{t("homepage.title1")}</div>
        <div className="content-title2">{t("homepage.title2")}</div>
        <div className="content-title3">
          {isAuthenticated === false ? (
            <button onClick={() => navigate("/login")}>
              {t("homepage.title3.notlogin")}
            </button>
          ) : (
            <button onClick={() => navigate("/user")}>
              {t("homepage.title3.login")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
