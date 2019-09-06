import React from "react";
import { Link } from "react-router-dom";

class NavTabs extends React.Component {
  
  formatSeconds = (seconds) => {
    if (seconds < 60) {
      return seconds < 10 ? `00:0${seconds % 60}` : `00:${seconds % 60}`;
    } else {
      return seconds % 60 < 10 ? `${(seconds / 60).toFixed()}:0${seconds % 60}` : `${(seconds / 60).toFixed()}:${seconds % 60}`;
    }
  }
  

  componentDidMount(){
    console.log(this.props.conditionalRender(1, 2));
  }

  
  
  render() {
    return (
      <div>
          {this.props.conditionalRender(
            (<ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to="/" className={this.props.location === "/" ? "nav-link active" : "nav-link"}>
                home
              </Link>
            </li>
          </ul>),

            (<ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to="/" className={this.props.location === "/" ? "nav-link active" : "nav-link"}>
                  home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sabotage" className={this.props.location === "/sabotage" ? "nav-link active" : "nav-link"}>
                  sabotage
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/roulette" className={this.props.location === "/roulette" ? "nav-link active" : "nav-link"}>
                roulette
              </Link>
            </li>
              <li className="nav-item">
                <Link to="/leaderboard" className={this.props.location === "/leaderboard" ? "nav-link active" : "nav-link"}>
                  leaderboard
                </Link>
              </li>
            </ul>
          ))}
        <span id="time-passed">{this.formatSeconds(this.props.timePass)}</span>
      </div>
  )};
}

export default NavTabs;
