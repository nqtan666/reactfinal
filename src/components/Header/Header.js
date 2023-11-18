import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../service/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";
import { useState } from "react";
import Profile from "./Profile";
const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => {
    return state.user.account;
  });
  //show modal profile | default not show = false
  const [showModalProf, setShowModalProf] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/sign-up");
  };
  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <NavLink to="/" className="navbar-brand">
          TanNQ
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.text-home")}
            </NavLink>
            <NavLink to="/user" className="nav-link">
              {t("header.text-users")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {t("header.text-admin")}
            </NavLink>
          </Nav>

          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  Log in
                </button>
                <button className="btn-signup" onClick={() => handleSignup()}>
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown
                title={t("header.text-setting")}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => setShowModalProf(true)}
                  to="#action/3.1"
                >
                  {t("header.text-prof")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleLogOut()}
                  to="#action/3.1"
                >
                  {t("header.text-logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Profile show={showModalProf} setShow={setShowModalProf} />
    </Navbar>
  );
};

export default Header;
