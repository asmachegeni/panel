import { NavLink } from "react-router-dom";
import { SideBarItem } from "./SideBar.types";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import "./Sidebar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
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
  const x = ({ isActive }: { isActive: boolean }): string =>
    isActive ? "sidebar-link-active" : "sidebar-link";
  return (
    <div className={isOpen ? "sidebar-container" : "sidebar-container_col"}>
      <ul className="sidebar-list">
        {items.map((item) => (
          <li className="sidebar-list-item">
            <NavLink to={item.link} className={x}>
              {item.icon}
              {isOpen && <span>{item.text}</span>}
            </NavLink>
          </li>
        ))}
        <li className="sidebar-list-item">
          <button>
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
