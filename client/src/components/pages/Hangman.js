import React from "react";
import NavTabs from "../NavTabs";
const CipherJS = require('cipherjs');

class Hangman extends React.Component {
  
  state = {
    input: "",
    key: 5,
    encrypt: "",
    word: "swerve"
  }

  handleInputChange = (event) => {
    const {name,value} = event.target;
    let cipher = CipherJS.Caesar.encrypt(value.toUpperCase(), this.state.key);

    this.setState({
      [name]: value,
      encrypt: cipher
    });

  };

  
  render(){
    return (
      <div>
        <NavTabs location="/hangman"/>
        <div className="content">
          <h1>hangman</h1>
          <input 
            type="text" 
            name="input" 
            value={this.state.input.toUpperCase()} 
            placeholder="your message" 
            onChange={this.handleInputChange}
            autocomplete="off"
          />
          <div id="hangman">
            answer: <span id="hangman-word">{this.state.word.toUpperCase()}</span>          
          </div>
          <p id="shadow-live">{this.state.encrypt}</p>
          <div className="hello">
            <p id="encrypt-live">{this.state.encrypt}</p>
          </div>
        </div>  
      </div>
  )}
}

export default Hangman;
