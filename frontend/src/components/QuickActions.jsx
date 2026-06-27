import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeadphones,
  FaBookOpen,
  FaBook,
  FaStar,
} from "react-icons/fa";

import "./QuickActions.css";

const actions = [
  {
    title: "Lectures",
    icon: <FaHeadphones />,
    path: "/lectures",
  },
  {
    title: "Tafsiir",
    icon: <FaBookOpen />,
    path: "/tafsiir",
  },
  {
    title: "Books",
    icon: <FaBook />,
    path: "/kutub",
  },
  {
    title: "Favorites",
    icon: <FaStar />,
    path: "/favorites",
  },
];

const QuickActions = () => {
  return (
    <section className="quick-actions">

      <h2 className="quick-title">
        Quick Access
      </h2>

      <div className="quick-grid">

        {actions.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="quick-card"
          >
            <div className="quick-icon">
              {item.icon}
            </div>

            <span>
              {item.title}
            </span>
          </Link>
        ))}

      </div>
    </section>
  );
};

export default QuickActions;