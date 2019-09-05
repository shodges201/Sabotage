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
        <Link to="/hangman" className={props.location === "/hangman" ? "nav-link active" : "nav-link"}>
          hangman
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/roulette" className={props.location === "/roulette" ? "nav-link active" : "nav-link"}>
          roulette
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
