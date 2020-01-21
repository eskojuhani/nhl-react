import React, { Component } from 'react';
import './App.css';
import DateGameList from './components/DateGameList';
import GraphCanvas from './components/GraphCanvas';
import GamePerformance from './components/GamePerformance';
import { fetchPerformance } from './components/api.service';
import { _ } from 'underscore';

class App extends Component {
  constructor(props) {
    super(props);

    this.gameSelected = this.gameSelected.bind(this);

    this.state = {
      isLoggedIn: false,
      selectedGame: {},
      homePerformance: [],
      awayPerformance: [],
      selectedDate: new Date(),
      searchTerm: new Date().toISOString().slice(0,10)
    };
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  gameSelected(game) {
    this.setState({
      selectedGame: game,
      homePerformance: [],
      awayPerformance: []
    });

    fetchPerformance(game.homeTeamName, this.state.selectedDate)
      .then(data => {
        this.setState({
          homePerformance: data
        });
      })
      .catch(err => console.log('There was an error:' + err))

      fetchPerformance(game.awayTeamName, this.state.selectedDate)
        .then(data => {
          this.setState({
            awayPerformance: data
          });
        })
        .catch(err => console.log('There was an error:' + err))

  }

  setDate(change) {
    var d = new Date(this.state.selectedDate);
    d.setDate(d.getDate() + change);
    this.setState({
      selectedDate: d,
      searchTerm: d.toISOString().slice(0,10)
    });
  }

  getGamePerformances() {
    let homePerformance;
    if (this.state.homePerformance) {
      homePerformance= <GamePerformance teamName={this.state.selectedGame.homeTeamName} data={this.state.homePerformance}  />;
    }
    else {
      homePerformance = {/* A JSX comment */}
    }
    let awayPerformance;
    if (this.state.awayPerformance) {
      awayPerformance= <GamePerformance teamName={this.state.selectedGame.awayTeamName} data={this.state.awayPerformance}  />;
    }
    else {
      awayPerformance = {/* A JSX comment */}
    }

    return (
      <div className="container">
        <div className="row row-centered">
          <div className="column-header">
              Performances
          </div>
        </div>
        <div className="row row-centered">
          <div className="col-md-6">
            <div>{ this.state.selectedGame.homeTeamName }</div>
          </div>
          <div className="col-md-6">
            <div>{ this.state.selectedGame.awayTeamName }</div>
          </div>
        </div>
        <div className="row row-centered">
          <div className="col-md-6">
            { homePerformance }
          </div>
          <div className="col-md-6">
            { awayPerformance }
          </div>
        </div>
      </div>
    )
  }
  render() {
    //selectedDate.setUTCHours(0, 0, 0, 0);
    let graphCanvas;
    if (this.state.selectedGame && !_.isEmpty(this.state.selectedGame)) {
      graphCanvas =
        <div className="entity-section entity-section-dark">
          <div className="container">
            <div className="row row-centered">
              <GraphCanvas game={this.state.selectedGame} home={this.state.homePerformance} away={this.state.awayPerformance} />
            </div>
          </div>
        </div>
    }
    else {
      graphCanvas = <span></span>
    }

    let gamePerformances;
    if (this.state.selectedGame && this.state.homePerformance && this.state.homePerformance.length &&
      this.state.awayPerformance && this.state.awayPerformance.length) {
      gamePerformances = this.getGamePerformances();
    }

    return (
      <div className="App">
        <div className="entity-section entity-section-light">
          <div className="container">
            <div className="row row-centered">
              <div className="column-header">
                <h1>NHL - React</h1>
              </div>
            </div>
            <div className="row row-centered">
              <div className="column-header">
                <span onClick={() => this.setDate(-1)}><i className="fa fa-hand-o-left"></i></span>
                  <span className="searchterm">{ this.state.searchTerm }</span>
                <span onClick={() => this.setDate(1)}><i className="fa fa-hand-o-right"></i></span>
              </div>
            </div>
            <div className="row row-centered">
              <div className="col-md-12">
                <DateGameList onClick={this.gameSelected} gameDate={ this.state.searchTerm } />
              </div>
            </div>
          </div>
        </div>
        { graphCanvas }
        <div className="entity-section entity-section-light">
          { gamePerformances }
        </div>
      </div>
    );
  }
}

export default App;
