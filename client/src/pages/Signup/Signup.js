import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";


class Signup extends React.Component {

    // state = {
    //   title: "ZOBEJXKQ®"
    // }
    

    render() {
      return (
        <div>
          <NavTabs location="/signup"/>
          <div className="signup">
            <form id="signup-form">
                <label>join the network</label>
                <input type="text" name="username" placeholder=" username"></input>
                <input type="password" name="password" placeholder=" password"></input>
                <button type="submit" id="signup-btn">signup</button>
                <span className="switch-link">already a member? <a href="/signup">sign up</a></span>
            </form>
          </div>
        </div>

    )}
  }
  
  export default Signup;