import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import './Sabotage.css';
// import API from '../../utils/API.js';

class Sabotage extends React.Component {

  state = {
    //actual user input, before mixing it up
    input: "",
    //switched user input
    encrypt: "",
    words: ["wood","grace","left","feet","group","quiet","climb","skip","pen","java","core","tram","eagle","nine","xray","zebra"],
    word:"",
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    mixed: [],
    timeLeft:30,
    timerColor:"linear-gradient(0deg, red 0%, white 0%)",
    rotate: 0,
    wins: 0
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
    //gets random word from this.state.words
    let str = this.state.words[Math.floor((Math.random() * this.state.words.length))];
    return str.toLocaleUpperCase();
  }

  pad = (str, max) => {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  }

  componentDidMount(){
    // this.wordInterval = setInterval(() => this.eachWordTick(), 1000);
    this.wordInterval = setInterval(() => this.eachWordTick(), 100);
    this.userInput.focus();
    let copy = this.state.alphabet.slice();
    copy = this.shuffle(copy);
    let rand = this.randomStringGenerate();
    this.setState({ 
      mixed: copy, 
      word: rand 
    })
  }

  componentWillUnmount() {
    clearInterval(this.wordInterval);
  }

  eachWordTick = () => {
    this.userInput.focus();
    if (this.state.timeLeft > 0) {
      console.log(`${100 * (((30 - this.state.timeLeft) + 1) / 30)}`);
      console.log(((30 - this.state.timeLeft) + 1));
      this.setState(state => ({
        timerColor: `linear-gradient(0deg, red ${100 * (((30 - state.timeLeft) + 1) / 30)}%, white 0%)`,
        // timerColor: `linear-gradient(0deg, red ${(100*(30-state.timeLeft)/30)}%, white 0%)`,
        timeLeft: this.state.timeLeft - .1
      }));
    } else {
      console.log("time out")
      clearInterval(this.wordInterval);
      // let copy = this.state.alphabet.slice();
      // copy = this.shuffle(copy);
      // let rand = this.randomStringGenerate();
      this.setState(state => ({ 
        // timerColor: `red`,
        timeLeft:0
        // mixed: copy, 
        // word: rand
      }));
    }
    
    
  }

  degreesToRadians = (num) => {
    return num/Math.PI;
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
    console.log(`cipher ${cipher}`);
    console.log(`word ${this.state.word}`);
    this.setState({
      [name]: value,
      encrypt: cipher
    });
    if(cipher.toUpperCase() === this.state.word.toUpperCase()){
      this.guessedCorrect();
    }
  };

  guessedCorrect = () => {
    clearInterval(this.wordInterval);
    //5th win while playing in a row
    this.setState({
      timerColor:"rgb(47,255,99)", 
      wins: this.state.wins + 1
    })
    if(this.state.wins % 5 === 4){
      //Do something
    }
    else{
      // this.wordInterval = setInterval(() => this.eachWordTick(), 1000);
      this.wordInterval = setInterval(() => this.eachWordTick(), 100);
      this.setState({
        timerLeft: 30,
        
      })
    }
  }
  
  render(){
    console.log(this.state.timerColor)
    return (
      <div>
        <NavTabs location="/sabotage" />
        <div className="content">

          <h1>sabotage</h1>
          <span className="instructions">type the given word before time runs out...</span>
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

          

          {/* <div id="hangman" style={{transform: `rotate(${Math.sin(this.degreesToRadians(this.state.rotate))}deg)`}}> */}
          <div id="hangman">
            answer: <span id="hangman-word">{this.state.word.toUpperCase()}</span>{" "}<br/>
            Time Passed: <span id="time-passed" >{this.props.timePass}</span>{" "}<br/>
            Time Left to Guess: <span id="time" > {this.state.timeLeft.toFixed(1)}</span>{" "}<br/>
            Wins: <span id="time" > {this.state.wins}</span>{" "}
          </div>

          <p id="shadow-live">{this.state.encrypt}</p>

          <div className="hello">
            <p id="encrypt-live">{this.state.encrypt}</p>
          </div>
        </div>
      </div>

    )}

}

export default Sabotage;
