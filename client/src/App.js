import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Encrypt from "./components/pages/Encrypt";
import Decrypt from "./components/pages/Decrypt";
import Hangman from "./components/pages/Hangman";

function App() {
  console.log("zubin")
  console.log(window.location.pathname)
  return (
    <Router>
      <div className="wrapper">
        <Route exact path="/" component={Home} />
        <Route exact path="/encrypt" component={Encrypt} />
        <Route exact path="/decrypt" component={Decrypt} />
        <Route exact path="/hangman" component={Hangman} />
      </div>
    </Router>
  );
}

export default App;
