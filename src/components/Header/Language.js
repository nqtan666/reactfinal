import { NavDropdown } from "react-bootstrap";
const Language = () => {
  return (
    <>
      <NavDropdown
        title="Việt Nam"
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item to="#action/3.1">English</NavDropdown.Item>
        <NavDropdown.Item to="#action/3.1">Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
