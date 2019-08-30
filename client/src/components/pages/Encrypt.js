import React from "react";
import NavTabs from "../NavTabs";
const CipherJS = require('cipherjs');

class Encrypt extends React.Component {
  
  state = {
    input:"",
    key:0,
    encrypt:""
  }

  handleInputChange = (event) => {
    const {name,value} = event.target;
    let cipher;
    if([name]==="input"){
      cipher = CipherJS.Caesar.encrypt(value, this.state.key)
    }
    else {
      cipher = CipherJS.Caesar.encrypt(this.state.input, parseInt(value))
    }

    this.setState({
      [name]: value,
      encrypt: cipher
    });
    
  };
  
  render(){
    return (
      <div>
        <NavTabs location="/encrypt"/>
        <div className="content">
          <h1>encrypt</h1>
          <input 
            type="text" 
            name="input" 
            value={this.state.input} 
            placeholder="your message" 
            onChange={this.handleInputChange}
            autocomplete="off"
          />
          <input 
            type="number" 
            name="key" 
            value={this.state.key} 
            placeholder="secret key" 
            onChange={this.handleInputChange}
            autocomplete="off"
          />
          <p id="shadow-live">{this.state.encrypt}</p>
          <div className="hello">
            <p id="encrypt-live">{this.state.encrypt}</p>
          </div>
        </div>  
      </div>
  )}
}

export default Encrypt;
