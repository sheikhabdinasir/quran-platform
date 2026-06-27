import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBookOpen,
  FaBook,
  FaUserCircle,
} from "react-icons/fa";
import { MdGraphicEq } from "react-icons/md";

const BottomNavigation = () => {
  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: <FaHome />,
    },
    {
      path: "/lectures",
      label: "Lectures",
      icon: <MdGraphicEq />,
    },
    {
      path: "/tafsiir",
      label: "Tafsiir",
      icon: <FaBookOpen />,
    },
    {
      path: "/kutub",
      label: "Books",
      icon: <FaBook />,
    },
    {
      path: "/about",
      label: "About",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="bottom-nav-icon">
            {item.icon}
          </span>

          <span className="bottom-nav-label">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavigation;