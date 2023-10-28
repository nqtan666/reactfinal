import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaRegCopyright,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg_sidebar.jpg";
import logo from "../../assets/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
const SideBar = (props) => {
  const navigate = useNavigate();
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <img className="img-logo" src={logo}></img>
            <span onClick={() => navigate("/")}>TanNQ</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              // suffix={<span className="badge red">New</span>}
            >
              Dashboard
              <NavLink to="/admins" className="nav-link"></NavLink>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu title="Features" icon={<FaRegLaughWink />}>
              <MenuItem>
                Quản Lý User
                <NavLink
                  to="/admins/manage-users"
                  className="nav-link"
                ></NavLink>
              </MenuItem>
              <MenuItem>
                Quản Lý Bài Quiz
                <NavLink
                  to="/admins/manage-quiz"
                  className="nav-link"
                ></NavLink>
              </MenuItem>
              <MenuItem>
                {" "}
                Quản Lý Câu Hỏi
                <NavLink
                  to="/admins/manage-questions"
                  className="nav-link"
                ></NavLink>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <button className="btn-footer-sidebar">
              <span className="icon-footer-sidebar">
                <FaRegCopyright />
              </span>
              <a
                style={{ whiteSpace: "nowrap" }}
                href="https://www.google.com/"
                className="link-footer-sidebar"
              >
                Hoc Cung Toi
              </a>
            </button>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};
export default SideBar;
