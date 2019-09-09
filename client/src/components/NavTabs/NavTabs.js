import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment"
import 'moment-timezone';

class NavTabs extends React.Component {
  
  formatSeconds = (seconds) => {
    if (seconds > 3600) {
      let hh = parseInt(seconds / 3600)
      let mm = parseInt((seconds - (3600 * hh)) / 60)
      let ss = (seconds - (3600 * hh)) % 60
      // console.log(hh+":"+mm+":"+ss)
      if (hh > 10 && mm > 10) {
        return ss < 10 ? `${hh}:${mm}:0${ss}` : `${hh}:${mm}:${ss}`;
      } else if (hh > 10 && mm > 0) {
        return ss < 10 ? `${hh}:0${mm}:0${ss}` : `${hh}:0${mm}:${ss}`;
      } else if (hh > 0 && mm > 10) {
        return ss < 10 ? `0${hh}:${mm}:0${ss}` : `0${hh}:${mm}:${ss}`;
      } else if (hh > 0 && mm > 0) {
        return ss < 10 ? `0${hh}:0${mm}:0${ss}` : `0${hh}:0${mm}:${ss}`;
      } else {
        return ss < 10 ? `00:00:0${ss}` : `00:00:${ss}`;
      }
    } else {
      let mm = parseInt(seconds / 60)
      let ss = seconds % 60
      if (mm > 10) {
        return ss < 10 ? `00:${mm}:0${ss}` : `00:${mm}:${ss}`;
      } else if (mm > 0) {
        return ss < 10 ? `00:0${mm}:0${ss}` : `00:0${mm}:${ss}`;
      } else {
        return ss < 10 ? `00:00:0${ss}` : `00:00:${ss}`;
      }
    }
  }
  

  componentDidMount(){
    // console.log(this.props.conditionalRender(1, 2));
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
                <Link to="/leaderboard" className={this.props.location === "/leaderboard" ? "nav-link active" : "nav-link"}>
                  leaderboard
                </Link>
              </li>
              <li className="logout-btn">
                <Link to="/" onClick={this.props.logout} className="nav-link">
                  logout
                </Link>
              </li>
            </ul>
          ))}
        <span id="time-passed">
          {/* <Moment parse="ss" format="HH:mm:ss" tz="America/New_York" interval={1000}>{this.props.timePass}</Moment> */}
          <Moment parse="HH:mm:ss" format="HH:mm:ss" tz="America/New_York">{this.formatSeconds(this.props.timePass)}</Moment>
          {/* {this.formatSeconds(this.props.timePass)} */}
          {/* <br/><br/>{this.props.timePass} */}
        </span>
      </div>
  )};
}

export default NavTabs;
