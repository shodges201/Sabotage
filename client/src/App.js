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

  formatSeconds = (seconds) => {
    if(seconds < 60){
      return seconds;
    }
    else{
      return seconds % 60 < 10 ? `${(seconds / 60).toFixed()}:0${seconds % 60}` : `${(seconds / 60).toFixed()}:${seconds % 60}`;
    }
  }

  render(){
    return (
      <div>
      <Router>
        <div className="wrapper">
          <Route exact path="/" component={Home} />
          <Route exact path="/sabotage" 
          render={(routeProps) => (
            <Sabotage timePass={this.formatSeconds(this.state.timePass)}/>
          )} />
          <Route exact path="/leaderboard" component={Leaderboard} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
