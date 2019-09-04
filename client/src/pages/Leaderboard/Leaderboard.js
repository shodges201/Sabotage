import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import Table from "../../components/Table/Table";
import TableEntry from "../../components/TableEntry/TableEntry";
import './Leaderboard.css';
import Pusher from 'pusher-js';
const API_URL = 'http://localhost:9000/api/';
// import users from "../../fakeUsers.json"

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: '',
      score: 0
    }
    // this.getUsers = this.getUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.postUser = this.postUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  componentDidMount() {
    this.pusher = new Pusher('b2809c73fbc28accc074', {
      cluster: 'us2',
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('users');

    this.channel.bind('inserted', this.addUser);
    this.channel.bind('deleted', this.removeUser);
    // this.getUsers()
  }

  getUsers() {
    fetch(API_URL + 'users', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => {
      console.log(data)
      // this.setState({
      //   users: data
      // });
    });
  }

  updateUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  postUser(e) {
    e.preventDefault();
    if (!this.state.user.length) {
      return;
    }
    const newUser = {
      user: this.state.user
    };
    fetch(API_URL + 'new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(console.log);
  }

  deleteUser(id) {
    fetch(API_URL + id, {
      method: 'delete'
    }).then(console.log);
  }

  addUser(newUser) {
    this.setState(prevState => ({
      users: prevState.users.concat(newUser),
      user: ''
    }));
  }

  removeUser(id) {
    this.setState(prevState => ({
      users: prevState.users.filter(el => el.id !== id)
    }));
  }

  
  render(){
    // console.log(this.state.timerColor)
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
                    key={user.id}
                    position={this.state.users.indexOf(user)+1}
                    username={user.username}
                    score={user.score}
                    onUserClick={this.deleteUser}
                  />
                )
              })}
            </Table>
          </div>
          

          <div id="time-left">
          </div>

          
        </div>  
      </div>
  )}

}

export default Leaderboard;
