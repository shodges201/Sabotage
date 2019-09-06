import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sabotage from "./pages/Sabotage/Sabotage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Roulette from "./pages/Wheel/Roulette";
const API_URL = '/api/';
const deduct = -10;

const handleOnComplete = (value) => {
  console.log(value);
};

const options = [
  "war",
  "pain",
  "words",
  "love",
  "life",
];


class App extends React.Component{

  state = {
    timePass: 0,
    // currentUser: "5d7014a083aacbc2d669d4a8" //zubin
    currentUser: "", //izzy,
    loggedIn: false
  }

  constructor(props) {
    super(props);
    this.handleClick = this.conditionalRender;
  }

  componentDidMount(){
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
    fetch(API_URL+"score",{
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

  render(){
    console.log(this.state)
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
                <Home timePass={this.state.timePass} loggedIn={this.state.loggedIn} conditionalRender={this.conditionalRender} userState={this.userState}/>
              )} /> 
              <Route exact path="/sabotage" render={() => (
                <Sabotage timePass={this.state.timePass} currentUser={this.state.currentUser} conditionalRender={this.conditionalRender} loggedIn={this.state.loggedIn} userState={this.userState} updateScores={this.updateScores}/>
              )} />
              <Route exact path="/leaderboard" render={() => (
                <Leaderboard timePass={this.state.timePass} loggedIn={this.state.loggedIn} conditionalRender={this.conditionalRender} userState={this.userState} updateScores={this.updateScores}/>
              )} />
            </div>))}
        </div>
      </Router>
      </div>
    );
  }
}

export default App;







