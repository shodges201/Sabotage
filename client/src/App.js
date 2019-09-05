import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sabotage from "./pages/Sabotage/Sabotage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
const API_URL = '/api/';
const deduct = -10;

class App extends React.Component{
  state = {
    timePass: 0,
    // currentUser: "5d7014a083aacbc2d669d4a8" //zubin
    currentUser: "5d705688194719d72b9fc335" //izzy
  }

  componentDidMount(){
    this.interval = setInterval(() => this.constantTick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  constantTick = () => {
    // console.log(this.state.timePass % 10);
    if(this.state.timePass % 10 === 0){
      //uncomment line to turn on live leaderboard
      //this.updateScores(deduct);
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
    fetch(API_URL+this.state.currentUser,{
      method:'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  render(){
    return (
      <div>
      <Router>
        <div className="wrapper">
          <Route exact path="/" render={() => (
            <Home timePass={this.state.timePass} />
          )} /> 
          <Route exact path="/sabotage" render={() => (
            <Sabotage timePass={this.state.timePass} currentUser={this.state.currentUser}/>
          )} />
          <Route exact path="/leaderboard" render={() => (
            <Leaderboard timePass={this.state.timePass} />
          )} /> 
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
