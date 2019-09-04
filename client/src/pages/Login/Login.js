import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";


class Login extends React.Component {

    // state = {
    //   title: "ZOBEJXKQ®"
    // }
    

    render() {
      return (
        <div>
          <NavTabs location="/login"/>
          <div className="login">
            <form id="login-form">
                <label>welcome back,</label>
                <input type="text" name="username" placeholder=" username"></input>
                <input type="password" name="password" placeholder=" password"></input>
                <button type="submit" id="login-btn">login</button>
                <span className="switch-link">not a member? <a href="/signup">sign up</a></span>
            </form>
          </div>
        </div>

    )}
  }
  
  export default Login;