import React from "react";
import NavTabs from "../NavTabs";
const CipherJS = require('cipherjs');

class Decrypt extends React.Component {
  
  state = {
    input:"",
    key:0,
    decrypt:""
  }

  handleInputChange = event => {
    const {name,value} = event.target;

    let cipher;
    if ([name] === "input") {
      cipher = CipherJS.Caesar.decrypt(value, this.state.key)
    } else {
      cipher = CipherJS.Caesar.decrypt(this.state.input, parseInt(value))
    }
    
    this.setState({
      [name]: value,
      decrypt: cipher
    });
    
  };
  
  render(){
    return (
    <div>
        <NavTabs location="/decrypt"/>
        <div className="content">
          <h1>decrypt</h1>
          <input 
            type="text" 
            name="input" 
            value={this.state.input} 
            placeholder="coded message" 
            onChange={this.handleInputChange}
          />
          <input  
            type="number" 
            name="key" 
            value={this.state.key} 
            placeholder="secret key" 
            onChange={this.handleInputChange}
          />
          <p id="shadow-live">{this.state.decrypt}</p>
          <div className="goodbye">
            <p id="decrypt-live">{this.state.decrypt}</p>
          </div>
        </div>  
      </div>
  )}
}

export default Decrypt;
