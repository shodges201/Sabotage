import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
// import Scrambler from "../../components/Scrambler/Scrambler";

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
        <NavTabs location="/" timePass={this.props.timePass}/>
        <div className="content">
          <h1> WELCOME TO <span id="true-north" onMouseEnter={this.decrypt_title} onMouseLeave={this.encrypt_title}>{this.state.title}</span></h1>
          {/* <h1> WELCOME TO <Scrambler>{this.state.title}</Scrambler></h1> */}
        </div>
      </div>
  )}
}

export default Home;
