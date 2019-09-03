import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import './Leaderboard.css';


class Leaderboard extends React.Component {

  state = {
    
  }

  
  render(){
    console.log(this.state.timerColor)
    return (
      <div>
        <NavTabs location="/leaderboard" />
        <div className="content">

          <h1>leaderboard</h1>
          <span className="instructions">check in on your friends...</span>
          

          <div>
            
          </div>
          

          

          
        </div>  
      </div>
  )}

}

export default Leaderboard;
