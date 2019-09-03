import React from "react";
import NavTabs from "../NavTabs";
// const CipherJS = require('cipherjs');

class Hangman extends React.Component {
  
  state = {
    input: "",
    key: 5,
    encrypt: "",
    word: "lmao",
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    mixed: [],
    timeLeft:0,
    timerColor:"red"
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

  pad = (str, max) => {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }

  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 100);
    let copy = this.state.alphabet.slice();
    copy = this.shuffle(copy);
    console.log(copy);
    this.setState({mixed: copy})
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(state => ({
      timeLeft: state.timeLeft+1,
    }));
  }
  

  convertToEncypted = (str) => {
    let newStr = '';
    str = str.split('');
    console.log(str);
    str.forEach((letter) => {
      let ascii = letter.charCodeAt(0);
      if(ascii <= 122 && ascii >= 97)
        newStr += this.state.mixed[this.state.alphabet.indexOf(letter)];
      else
        newStr += letter;
    })
    return newStr;
  }

  handleInputChange = (event) => {
    const {name,value} = event.target;
    console.log(value.toLowerCase());
    let cipher = value;
    cipher = this.convertToEncypted(value.toLowerCase()).toUpperCase();
    console.log(`cipher ${cipher}`);
    console.log(`word ${this.state.word}`);
    this.setState({
      [name]: value,
      encrypt: cipher
    });
    if(cipher.toLowerCase()===this.state.word){
      clearInterval(this.interval);
      this.setState({timerColor:"rgb(47,255,99)"})
    }
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
            autoComplete="off"
          />

          <div id="time-left" style={{color: this.state.timerColor}}>
            {`-${this.pad(this.state.timeLeft,10)}`}
          </div>

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
