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
        <Link to="/encrypt" className={props.location === "/encrypt" ? "nav-link active" : "nav-link"}>
          encrypt
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/decrypt" className={props.location === "/decrypt" ? "nav-link active" : "nav-link"}>
          decrypt
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/hangman" className={props.location === "/hangman" ? "nav-link active" : "nav-link"}>
          hangman
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
