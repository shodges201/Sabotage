import React from "react";
import { Link } from "react-router-dom";

function NavTabs(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={props.location === "/" ? "nav-link active" : "nav-link"}>
          home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/sabotage" className={props.location === "/sabotage" ? "nav-link active" : "nav-link"}>
          sabotage
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
