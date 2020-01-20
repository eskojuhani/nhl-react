import React, { Component } from 'react';
import './App.css';
import GameList from './components/GameList';
import UserList from './components/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header-title">NHL - React</h1>
        </header>
        <div className="App-intro">
          <GameList gameDate={"2020-01-19"} />
          <UserList />
        </div>
      </div>
    );
  }
}

export default App;
