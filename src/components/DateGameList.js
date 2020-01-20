import React, { Component } from 'react';
import axios from 'axios';


class DateGames extends Component {
  state = {
    data: [],
    error: '',
    gameDate: '2020-01-19'
  };

  componentDidMount() {
    const metadata = {"table": "NHLGame",
      "where": JSON.stringify([{'gameDate = ': this.state.gameDate}]),
      "order": "gamePk"};

    axios
      .get('http://localhost:8008/api/table', {
        headers: metadata
        })
      .then(res => this.setState({ data: res.data }))
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <div className="container">
        <div>
          <h2>React Async - User list</h2>
        </div>
        <div className="userlist">
           {this.state.data.map(game => (
             <div key={game.gamePk} className="row">
               <div className="col-md-12">
                 <p>{game.homeTeamName} vs {game.awayTeamName}</p>
               </div>
             </div>
           ))}
         </div>
       </div>
      )
  }
}

export default DateGames;
