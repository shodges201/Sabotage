import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sabotage from "./pages/Sabotage/Sabotage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
const API_URL = 'http://localhost:9000/api/';

class App extends React.Component{
  state = {
    timePass: 0,
    deduct:0,
    // currentUser: "5d705563194719d72b9fc334" //zubin
    currentUser: "5d705688194719d72b9fc335" //izzy
  }

  componentDidMount(){
    this.interval = setInterval(() => this.constantTick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  constantTick = () => {
    this.setState(state => ({
      timePass: state.timePass + 1,
      deduct: state.timePass % 10 ? 0 : -10,
      rotate: state.rotate + .5
    }));

    // uncomment this line to turn on live leaderboard
    // this.updateScores()
  }

  updateScores() {
    const data = {
      deduct:this.state.deduct
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
            <Sabotage timePass={this.state.timePass} />
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
