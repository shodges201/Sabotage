import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sabotage from "./pages/Sabotage/Sabotage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

class App extends React.Component{
  state = {
    timePass : 0 
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
      rotate: state.rotate + .5
    }));
  }

  

  render(){
    return (
      <div>
      <Router>
        <div className="wrapper">
          <Route exact path="/" render={() => (
            <Home timePass={this.state.timePass}/>
          )} /> 
          <Route exact path="/sabotage" render={() => (
            <Sabotage timePass={this.state.timePass}/>
          )} />
          <Route exact path="/leaderboard" render={() => (
            <Leaderboard timePass={this.state.timePass}/>
          )} /> 
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
