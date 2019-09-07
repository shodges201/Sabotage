import React from "react";
import NavTabs from "../../components/NavTabs/NavTabs";
import Table from "../../components/Table/Table";
import TableEntry from "../../components/TableEntry/TableEntry";
import './Leaderboard.css';
import Pusher from 'pusher-js';
const API_URL = '/api/';
const compare = (a, b) =>  b.score - a.score;



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
    this.channel.bind('updated', this.updateUser);
    this.getUsers();
  }

  getUsers() {
    fetch(API_URL + 'users', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      console.log(data)
      this.setState({
        users: data.sort(compare)
      });
    });
  }

  updateUser(e) {
    let newList = this.state.users.map((user) => {
      if(user._id === e.id){
        user.score = e.score;
        return user;
      }
      else{
        return user;
      }
    });

    let l = newList.sort(compare);
    console.log(l);
    this.setState({
      users: l
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
      users: prevState.users.concat(newUser).sort(compare),
      user: ''
    }));
  }

  removeUser(id) {
    this.setState(prevState => ({
      users: prevState.users.filter(el => el.id !== id).sort(compare)
    }));
  }

  
  render(){
    // console.log(this.state.timerColor)
    return (
      <div>
        <NavTabs 
          location="/leaderboard" timePass={this.props.timePass} 
          conditionalRender={this.props.conditionalRender} logout={this.props.logout}
        />
        <div className="content">

          <h1 id="leaderboard-header">leaderboard</h1>
          <span className="memo-w">check in on the top scorers or just your friends...</span>
            
          <div>
            <Table>
              {this.state.users.map(user => {
                return(
                  <TableEntry
                    key={user._id}
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
