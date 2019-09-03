import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";

class Home extends React.Component {

  state = {
    title: "ZOBEJXKQ®"
  }
  
  decrypt_title = event => {
    event.preventDefault()
    this.setState({title:"SABOTAGE®"})
  }
  
  encrypt_title = event => {
    event.preventDefault()
    this.setState({title:"ZOBEJXKQ®"})
  }


  render() {
    return (
      <div>
        <NavTabs location="/"/>
        <div className="content">
          <h1> WELCOME TO <span id="true-north" onMouseEnter={this.decrypt_title} onMouseLeave={this.encrypt_title}>{this.state.title}</span></h1>
        </div>
      </div>
  )}
}

export default Home;
