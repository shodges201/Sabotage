import React from "react";

function Form(props){

    return (
        <div id="home-form">
            <h3>{props.title}</h3><br/>
            <form onSubmit={props.submitForm}>
              <label>username</label><br/>
              <input type="text" className="form-input" name="username" onChange={props.handleInputChange} placeholder="not your email" required/><br/>
              <label>password</label><br/>
              <input type="password" className="form-input" name="password" onChange={props.handleInputChange} placeholder="be creative" required/><br/>
              <button type="submit" className="form-button">{props.title}</button>
            </form>
            <br/>
            <span className="switch-link">{props.text}<span className="arrows"> > > > </span><button onClick={props.changeFormType} className="form-button switch-button">{props.notTitle}</button></span>
        </div>
    );
}

export default Form;