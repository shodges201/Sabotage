import React from "react";
import NavTabs from "../NavTabs";
const CipherJS = require('cipherjs');

class Hangman extends React.Component {
  
  state = {
    input: "",
    key: 5,
    encrypt: "",
    word: "swerve",
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    mixed: []
  }

  shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

  componentDidMount(){
    let copy = this.state.alphabet.slice();
    copy = this.shuffle(copy);
    console.log(copy);
    this.setState({mixed: copy})
  }

  convertToEncypted = (str) => {
    let newStr = '';
    str = str.split('');
    console.log(str);
    str.forEach((letter) => {
      newStr += this.state.mixed[this.state.alphabet.indexOf(letter)];
    })
    return newStr;
  }

  handleInputChange = (event) => {
    const {name,value} = event.target;
    console.log(value.toLowerCase());
    let ascii = value.charCodeAt(value.length-1);
    let cipher = value;
    if(ascii <= 122 && ascii >= 97){
      cipher = this.convertToEncypted(value.toLowerCase()).toUpperCase();
    }
    console.log(cipher);
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
