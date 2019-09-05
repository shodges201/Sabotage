import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import Form from "../../components/Form/Form";
// import Scrambler from "../../components/Scrambler/Scrambler";
const API_URL = '/api/';

class Home extends React.Component {

  state = {
    title: "ZOBEJXKQ®",
    username: "",
    password: "",
    loggedIn: false,
    formType: "sign up"
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
  
  changeFormType = () => {
    let newType = this.state.formType === "sign up" ? "login" : "sign up";
    this.setState({formType: newType});
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
  
  oldUser = (event) => {
    console.log("login")
    console.log(event);
    event.preventDefault();
    if (!this.state.username) {
      return;
    }
    // console.log(this.state.username);
    // console.log(this.state.password);
    const oldUser = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(API_URL + 'login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(oldUser)
    }).then((data) => console.log(data));
  }

  formRender = () => {
    if(!this.state.loggedIn){
      if(this.state.formType === "sign up"){
        return (<Form 
              title={this.state.formType}
              notTitle={"login"}
              text={"already a member? "} 
              submitForm={this.newUser}
              handleInputChange={this.handleInputChange}
              changeFormType={this.changeFormType}
              
            ></Form>)
      }
      else{
        return (<Form 
              title={this.state.formType} 
              notTitle={"sign up"} 
              text={"not a member? "} 
              submitForm={this.oldUser}
              handleInputChange={this.handleInputChange}
              changeFormType={this.changeFormType}
          ></Form>)      
      }
    }
    else{
      //add instructions component
    }
  }
  

  render() {
    return (
      <div>
        <NavTabs location="/" timePass={this.props.timePass}/>
        <div className="content">
          <h1> WELCOME TO <span id="true-north" onMouseEnter={this.decrypt_title} onMouseLeave={this.encrypt_title}>{this.state.title}</span></h1>
          {/* <h1> WELCOME TO <Scrambler>{this.state.title}</Scrambler></h1> */}
          {this.formRender()}
        </div>
      </div>
  )}
}

export default Home;
