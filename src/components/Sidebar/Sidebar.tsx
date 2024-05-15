import { NavLink } from "react-router-dom";
import { SideBarItem } from "./SideBar.types";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import "./Sidebar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import swal from "sweetalert";
import AuthService from "../../services/auth.service";
import { Bounce, toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../contexts/authcontext/authContext";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const authContext = useContext(AuthContext);

  const items: SideBarItem[] = [
    {
      text: "خانه",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "مدیریت فایل ها",
      icon: <FolderIcon />,
      link: "/files",
    },
  ];
  const linkClasss = ({ isActive }: { isActive: boolean }): string =>
    isActive ? "sidebar-link-active" : "sidebar-link";
  return (
    <div className={isOpen ? "sidebar-container" : "sidebar-container_col"}>
      <ul className="sidebar-list">
        {items.map((item) => (
          <li className="sidebar-list-item" key={item.link}>
            <NavLink to={item.link} className={linkClasss}>
              {item.icon}
              {isOpen && <span>{item.text}</span>}
            </NavLink>
          </li>
        ))}
        <li className="sidebar-list-item">
          <button
            onClick={() => {
              swal({
                title: "آیا از خروج از حساب کاربری خود مطمئن هستید؟",
                icon: "warning",
                dangerMode: true,
                buttons: ["خیر", "بله"],
              }).then((value) => {
                if (value) {
                  AuthService.logout({
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  })
                    .then((res) => {
                      if (res.status === 200) {
                        toast.success("ّبا موفقیت خارج شد", {
                          position: "top-left",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          transition: Bounce,
                        });
                        localStorage.removeItem("token");
                        authContext.setToken("");
                      }
                    })
                    .catch(() => {
                      toast.error("خروج از حساب کاربری انجام نشد ", {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                      });
                    });
                }
              });
            }}
          >
            <LogoutIcon />
            {isOpen && "خروج از حساب کاربری"}
          </button>
        </li>
        <li>
          <button
            className="sidebar-collapsebtn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
          </button>
        </li>
      </ul>
    </div>
  );
};
