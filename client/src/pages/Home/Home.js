import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
// import Scrambler from "../../components/Scrambler/Scrambler";
const API_URL = '/api/';

class Home extends React.Component {

  state = {
    title: "ZOBEJXKQ®",
    username: "",
    password: ""
  }
  
  decrypt_title = event => {
    event.preventDefault()
    this.setState({title:"SABOTAGE®"})
  }
  
  encrypt_title = event => {
    event.preventDefault();
    this.setState({title:"ZOBEJXKQ®"});
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  newUser = (event) => {
    console.log("sign up")
    console.log(event);
    event.preventDefault();
    if (!this.state.username) {
      return;
    }
    console.log(this.state.username);
    console.log(this.state.password);
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(API_URL + 'new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then((data) => console.log(data));
  }
  

  render() {
    return (
      <div>
        <NavTabs location="/" timePass={this.props.timePass}/>
        <div className="content">
          <h1> WELCOME TO <span id="true-north" onMouseEnter={this.decrypt_title} onMouseLeave={this.encrypt_title}>{this.state.title}</span></h1>
          {/* <h1> WELCOME TO <Scrambler>{this.state.title}</Scrambler></h1> */}
          <div id="home-form">
            <h3>sign up</h3><br/>
            <form onSubmit={this.newUser}>
              <label>username</label><br/>
              <input type="text" className="form-input" name="username" onChange={this.handleInputChange} required/><br/>
              <label>password</label><br/>
              < input type = "password" className = "form-input" name = "password" onChange={this.handleInputChange} required/><br/>
              <button type="submit" className="form-submit">sign up</button>
              <span className="switch-link">already a member? <a href="/signup">login</a></span>
            </form>
          </div>
        </div>
      </div>
  )}
}

export default Home;
