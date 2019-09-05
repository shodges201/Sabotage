import React from "react";
import NavTabs from "../../NavTabs";
import './Hangman.css';
import API from '../../../utils/API.js';

class Hangman extends React.Component {

  state = {
    input: "",
    key: 5,
    encrypt: "",
    word: "",
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    mixed: [],
    timeLeft:10,
    timePass:0,
    timerColor:"linear-gradient(0deg, red 0%, white 0%)"
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

  randomStringGenerate = () => {
    //length of string is random number between 5 and 30
    let length = Math.floor((Math.random() * 10) + 1);
    let str = '';
    for (let i = 0; i < length; i++) {
      let randNum = Math.floor((Math.random() * this.state.alphabet.length));
      str += this.state.alphabet[randNum];
    }
    return str;
  }

  pad = (str, max) => {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }

  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 100);
    this.userInput.focus();
    let copy = this.state.alphabet.slice();
    copy = this.shuffle(copy);
    //let rand = API.randomWord();
    //console.log(rand);
    let rand = this.randomStringGenerate();
    this.setState({ mixed: copy, word: rand })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.userInput.focus();
    this.setState(state => ({
      timePass: state.timePass+1,
      timerColor: `linear-gradient(0deg, red ${state.timePass/state.timeLeft}%, white 0%)`
    }));
  }
  

  convertToEncypted = (str) => {
    let newStr = '';
    str = str.split('');
    console.log(str);
    str.forEach((letter) => {
      let ascii = letter.charCodeAt(0);
      if (ascii <= 122 && ascii >= 97)
        newStr += this.state.mixed[this.state.alphabet.indexOf(letter)];
      else
        newStr += letter;
    });
    return newStr;
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value.toLowerCase());
    let cipher = value;
    cipher = this.convertToEncypted(value.toLowerCase()).toUpperCase();
    console.log(cipher);
    if(cipher.toUpperCase() === this.state.word.toUpperCase()){
      document.location.reload();
    }
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
    console.log(this.state.timerColor)
    return (
      <div>
        <NavTabs location="/hangman" />
        <div className="content">

          <h1>hangman</h1>
          <input
            ref={(input) => { this.userInput = input; }} 
            id="userInput"
            type="text"
            name="input"
            value={this.state.input.toUpperCase()}
            placeholder="your message"
            onChange={this.handleInputChange}
            autoComplete="off"
          />

          {/* <div id="time-left" style={{color: this.state.timerColor}}>
            {`-${this.pad(this.state.timePass,10)}`}
          </div> */}
          
          <div id="time-left" style={{background: this.state.timerColor}}>
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
    )
  }
}

export default Hangman;
