import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Sabotage from "./components/pages/Sabotage/Sabotage";

function App() {
  console.log("zubin")
  console.log(window.location.pathname)
  return (
    <Router>
      <div className="wrapper">
        <Route exact path="/" component={Home} />
        <Route exact path="/sabotage" component={Sabotage} />
      </div>
    </Router>
  );
}

export default App;
