import React, { Component } from 'react';
import Async from 'react-async';
import { fetchData } from './Requests';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDate: this.props.gameDate,
      metadata: {"table": "NHLGame",
        "where": JSON.stringify([{'gameDate = ': this.props.gameDate}]),
        "order": "gamePk"}
    };
  }
  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate", prevProps, this.props)
    if (prevProps.gameDate !== this.props.gameDate) {
      console.log("changed")
      this.setState({
        gameDate: this.props.gameDate,
        metadata: {"table": "NHLGame",
          "where": JSON.stringify([{'gameDate = ': this.props.gameDate}]),
          "order": "gamePk"}
      });
      //this.render();
    }
  }
  render() {
    console.log("GameList.render:", this.state.metadata);

    return (
      <div className="container"><div>{this.state.metadata.where}</div>
        <Async promiseFn={fetchData} headers={this.state.metadata}>
          <Async.Loading>Loading...</Async.Loading>

          <Async.Resolved>
            {data => (
              <div className="gameList"><div>{this.state.gameDate}</div>
                {data.map((game, index) => (
                  <div className="entity-box" key="index">
                    <div>{index}</div>
                    <div className="field-date">{game.gameDate}</div>
                    <div className="field-name">{game.homeTeamName}</div>
                    <div className="field-name">vs</div>
                    <div className="field-name">{game.awayTeamName}</div>
                    <div className="game.homeGameInfo">
                      <span>{game.homeGameInfo}</span>
                    </div>
                    <div className="game.awayGameInfo">
                      <span>{game.awayGameInfo}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Async.Resolved>

          <Async.Rejected>
            {error => `Something went wrong: ${error.message}`}
          </Async.Rejected>
        </Async>
      </div>
    )
  }
}

export default GameList;
