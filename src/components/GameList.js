import React, { Component } from 'react';
import Async from 'react-async';
import {  fetchData } from './Requests';

const metadata = {"table": "NHLGame",
  "where": JSON.stringify([{'gameDate = ': '2020-01-19'}]),
  "order": "gamePk"};

class GameList extends Component {
  render() {
    console.log(metadata)
    return (
      <div className="container">
        <Async promiseFn={fetchData(metadata)}>
          {({ data, err, isLoading }) => {
            if (isLoading) {
              console.log("isLoading");
              return "Loading..."
            }
            if (err) {
              console.log("error:", err);
              return `Something went wrong: ${err.message}`
            } 
            if (data)
              return (
                <div>
                  <div>
                    <h2>React Async - Scheduled Games</h2>
                  </div>
                  {data.map(game => (
                    <div key={game.gamePk} className="row">
                      <div className="col-md-12">
                        <p>{game.homeTeamName} vs  {game.awayTeamName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
          }}
        </Async>
      </div>
    )
  }
}

export default GameList;
