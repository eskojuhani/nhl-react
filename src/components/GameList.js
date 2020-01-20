import React, { Component } from 'react';
import Async from 'react-async';
import { fetchData } from './Requests';

class GameList extends Component {
  render() {
    const metadata = {"table": "NHLGame",
      "where": JSON.stringify([{'gameDate = ': this.props.gameDate}]),
      "order": "gamePk"};

    return (
      <div className="container">
        <Async promiseFn={fetchData} headers={metadata}>
          <Async.Loading>Loading...</Async.Loading>

          <Async.Resolved>
            {data => (
              <div className="gameList">
                {data.map((el, index) => (
                  <div key={index} className="row">
                    {el.homeTeamName} vs {el.awayTeamName}
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
