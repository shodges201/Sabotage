import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import Form from "../../components/Form/Form";
import FormAlert from '../../components/FormAlert/FormAlert.js';
const API_URL = '/api/';

class Home extends React.Component {

  state = {
    title: "ZOBEJXKQ®",
    username: "",
    password: "",
    formType: "login",
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
    this.setState({title: "ZOBEJXKQ®"});
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
    fetch('/api/new', {
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
        
        default:
            this.setState({error: true, message: "There was an error! Try again!"});
            break;
        }
      }
      else{
        console.log("success");
        this.props.userState(true,data);
        console.log(this.state.success || this.state.error);
      }
      })
      .catch(err => {
        this.setState({error: true, message: "There was an error! Try again!"});
        throw err;
    });
  }
  
  oldUser = (event) => { 
    event.preventDefault();
    if (!this.state.username) {
      return;
    }
    const oldUser = {
      username: this.state.username,
      password: this.state.password
    };
    fetch('/api/login', {
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
        this.setState({error: true, message: "There was an error! Try again!"});
        console.log(err);
    })
  }

  handleClose = () => {
    this.setState({success: false, error: false, message: ""});
  }


  formRender = () => {
    if(!this.props.loggedIn){
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
      return(
        //add instructions component
        <div className="welcome-mat">
          <h3 className="only-way">the only way to win is <i>not to play...</i></h3>
          <p>all <span className="keywords" >screen time</span> is deducted from your score</p>
          <p>win points by playing <span className="keywords">sabotage</span></p>
          <p><span className="keywords">spin the wheel</span> for a random bonus or penalty</p>
          <p>check the <span className="keywords">leaderboard</span> to see live scores</p>
          {/* <p><span className="keywords">add friends</span> and sabotage them!</p> */}
        </div>
      );

    }
  }
  

  render() {
    return (
      <div>
        <NavTabs 
          location="/" timePass={this.props.timePass} 
          conditionalRender={this.props.conditionalRender} logout={this.props.logout} 
        />
        <div className="content">
          <h1> WELCOME TO <span id="true-north" onMouseEnter={this.decrypt_title} onMouseLeave={this.encrypt_title}>{this.state.title}</span></h1>
          <span className="memo-w">don't waste your time...</span>
          {this.formRender()}
          <FormAlert 
            handleClose={this.handleClose} variant={this.state.success ? "success" : "error"} 
            message={this.state.message} open={this.state.success || this.state.error}/>
        </div>
      </div>
  )};
}

export default Home;
