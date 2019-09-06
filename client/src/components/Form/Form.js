import React from "react";

function Form(props){

    return (
        <div id="home-form">
            <h3>{props.title}</h3><br/>
            <form onSubmit={props.submitForm}>
              <label>username</label><br/>
              <input type="text" className="form-input" name="username" onChange={props.handleInputChange} required/><br/>
              <label>password</label><br/>
              <input type="password" className="form-input" name="password" onChange={props.handleInputChange} required/><br/>
              <button type="submit" className="form-button">{props.title}</button>
            </form>
            <span className="switch-link">{props.text}<button onClick={props.changeFormType} className="form-button switch-button">{props.notTitle}</button></span>
        </div>
    );
}

export default Form;