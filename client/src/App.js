import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sabotage from "./pages/Sabotage/Sabotage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";


function App() {
    return (
      <Router>
        <div className="wrapper">
          <Route exact path="/" component={Home} />
          <Route exact path="/sabotage" component={Sabotage} />
          <Route exact path="/leaderboard" component={Leaderboard} />
        </div>
      </Router>
  )
}

export default App;
