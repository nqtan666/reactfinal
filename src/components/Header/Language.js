import { NavDropdown } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
const Language = () => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "en" ? "English" : "Việt Nam"}
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item
          onClick={() => handleChangeLanguage("en")}
          to="#action/3.1"
        >
          English
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => handleChangeLanguage("vi")}
          to="#action/3.1"
        >
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
