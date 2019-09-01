import React from "react";
import NavTabs from "../NavTabs";
import API from '../../utils/API.js'

class Hangman extends React.Component {

  state = {
    input: "",
    key: 5,
    encrypt: "",
    word: "",
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

  randomStringGenerate = () => {
    //length of string is random number between 5 and 30
    let length = Math.floor((Math.random() * 30) + 1);
    let str = '';
    for (let i = 0; i < length; i++) {
      let randNum = Math.floor((Math.random() * this.state.alphabet.length));
      str += this.state.alphabet[randNum];
    }
    return str;
  }

  componentDidMount() {
    let copy = this.state.alphabet.slice();
    copy = this.shuffle(copy);
    //let rand = API.randomWord();
    //console.log(rand);
    let rand = this.randomStringGenerate();
    this.setState({ mixed: copy, word: rand })
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
    this.setState({
      [name]: value,
      encrypt: cipher
    });

  };


  render() {
    return (
      <div>
        <NavTabs location="/hangman" />
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
