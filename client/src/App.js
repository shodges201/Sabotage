import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sabotage from "./pages/Sabotage/Sabotage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
// const API_URL = '/api/';
const moment = require('moment');
const deduct = -10;

class App extends React.Component{

  state = {
    timePass: 0,
    currentUser: "", 
    loggedIn: false
  }

  constructor(props) {
    super(props);
    this.handleClick = this.conditionalRender;
  }

  componentDidMount(){
    // api call to the server "whos the active user"
    fetch("/api/user", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json()).then(data => {
      // console.log("currentUser")
      // console.log(data.username)
      console.log("data")
      console.log(data)
      let now = moment().
      let login = data.lastLogin
      let elapsed = now.diff(login,"seconds")
      console.log("now")
      console.log(now)
      console.log("login")
      console.log(login)
      console.log("elapsed")
      console.log(elapsed)
      if(data.username){
        this.setState({
          currentUser:data.username,
          loggedIn:true,
          timePass:elapsed
        })
      }
      if(this.state.loggedIn){
        this.interval = setInterval(() => this.constantTick(), 1000);
      }
    }).catch(err => {
      throw err;
    })

    
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  constantTick = () => {
    // console.log(this.state.timePass % 10);
    if(this.state.timePass % 10 === 0){
      //uncomment line to turn on live leaderboard
      this.updateScores(deduct);
    }
    this.setState(state => ({
      timePass: state.timePass + 1,
      rotate: state.rotate + .5
    }));
  }

  updateScores(amount) {
    console.log('hitting api');
    const data = {
      deduct: amount
    }
    fetch("/api/score",{
      method:'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  conditionalRender = (option1, option2) => {
    //console.log(this.state.loggedIn);
    if(!this.state.loggedIn){
      return option1;
    }
    else{
      return option2;
    }
  }

  userState = (setState,data) => {
    if(setState){
      this.interval = setInterval(() => this.constantTick(), 1000);
    }
    else{
      clearInterval(this.interval);
    }
    this.setState({
      loggedIn: setState,
      currentUser: data.username
    });
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      currentUser: "",
      timePass: 0
    });
    clearInterval(this.interval)
    fetch("/api/logout", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render(){
    // console.log(this.state)
    return (
      <div>
      <Router>
        <div className="wrapper">
          {this.conditionalRender(
            <Route exact path="/" render={() => (
              <Home timePass={this.state.timePass} loggedIn={this.state.loggedIn} conditionalRender={this.conditionalRender} userState={this.userState}/>
            )} />, 

            (<div>
              <Route exact path="/" render={() => (
                <Home 
                  timePass={this.state.timePass} loggedIn={this.state.loggedIn} 
                  conditionalRender={this.conditionalRender} userState={this.userState}
                  logout={this.logout}
                />
              )} /> 
              <Route exact path="/sabotage" render={() => (
                <Sabotage 
                  timePass={this.state.timePass} currentUser={this.state.currentUser} 
                  conditionalRender={this.conditionalRender} loggedIn={this.state.loggedIn} 
                  userState={this.userState} updateScores={this.updateScores}
                  logout={this.logout}
                />
              )} />
              <Route exact path="/leaderboard" render={() => (
                <Leaderboard 
                  timePass={this.state.timePass} loggedIn={this.state.loggedIn} 
                  conditionalRender={this.conditionalRender} userState={this.userState} 
                  updateScores={this.updateScores} logout={this.logout}
                />
              )} />
            </div>))}
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
