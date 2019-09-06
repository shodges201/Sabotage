import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import Form from "../../components/Form/Form";
import FormAlert from '../../components/FormAlert/FormAlert.js'
// import Scrambler from "../../components/Scrambler/Scrambler";
const API_URL = '/api/';

class Home extends React.Component {

  state = {
    title: "ZOBEJXKQ®",
    username: "",
    password: "",
    formType: "sign up",
    error: false,
    success: false,
    message: ""
  }

  componentDidMount(){
    
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
    }).then((data) => {
      console.log("data");
      console.log(data);
      if(!data.ok){
        console.log("Status text: " + data.statusText);
        switch(data.status){
          case 500:
            console.log("Status text: " + data.statusText);
            if(data.statusText === "Username Taken"){
              console.log("already taken");
              this.setState({error: true, message: "This username has already been taken! Try using a different one!"});
            }
            else{
              this.setState({error: true, message: "There was an error! Try again!"});
            }
            break;
        }
      }
      else{
        console.log("successs");
        this.props.userState(true,data);
        console.log(this.state.success || this.state.error);
      }
      })
      .catch(err => {
        throw err;
    });
  }
  
  oldUser = (event) => { 
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
    }).then(data => data.json()).then((data) => {
        console.log("data");
        console.log(data);
        if(!data.username){
          console.log("Status text: " + data.statusText);
          this.setState({error: true, message: "There was an error! Try again!"});
         }
        else{
          console.log("successful login");
          this.props.userState(true,data);
        }
    }).catch(err => {
        console.log(err);
    })
    console.log(this.state);
  }

  handleClose = () => {
    this.setState({success: false, error: false, message: ""});
  }

  formRender = () => {
    if(!this.state.loggedIn){
      if(this.state.formType === "sign up"){
        return (
          <>
          <Form 
            title={this.state.formType}
            notTitle={"login"}
            text={"already a member? "} 
            submitForm={this.newUser}
            handleInputChange={this.handleInputChange}
            changeFormType={this.changeFormType}
          ></Form>
          </>)
      }
      else{
        return (
          <>
          <Form 
              title={this.state.formType} 
              notTitle={"sign up"} 
              text={"not a member? "} 
              submitForm={this.oldUser}
              handleInputChange={this.handleInputChange}
              changeFormType={this.changeFormType}
          ></Form>
          </>)      
      }
    }
    else{
      return;
      //add instructions component
    }
  }
  

  render() {
    return (
      <div>
        <NavTabs location="/" timePass={this.props.timePass} conditionalRender={this.props.conditionalRender}/>
        <div className="content">
          <h1> WELCOME TO <span id="true-north" onMouseEnter={this.decrypt_title} onMouseLeave={this.encrypt_title}>{this.state.title}</span></h1>
          {/* <h1> WELCOME TO <Scrambler>{this.state.title}</Scrambler></h1> */}
          {this.formRender()}
          <FormAlert handleClose={this.handleClose} variant={this.state.success ? "success" : "error"} message={this.state.message} open={this.state.success || this.state.error}/>
        </div>
      </div>
  )};
}

export default Home;
