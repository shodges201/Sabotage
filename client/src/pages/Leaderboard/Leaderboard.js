import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import Table from "../../components/Table/Table";
import TableEntry from "../../components/TableEntry/TableEntry";
import './Leaderboard.css';

import users from "../../fakeUsers.json";


class Leaderboard extends React.Component {

  state = {
    users
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
            <Table>
              {this.state.users.map(user => {
                return(
                  <TableEntry
                    position={user.id}
                    username={user.username}
                    score={user.score}
                  />
                )
              })}
            </Table>
          </div>
          

          

          
        </div>  
      </div>
  )}

}

export default Leaderboard;
