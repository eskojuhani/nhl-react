import React, { Component } from 'react';
import axios from 'axios';
import { _ } from 'underscore';

class DateGameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gameDate: this.props.gameDate,
      metadata: {"table": "NHLGame",
        "where": JSON.stringify([{'gameDate = ': this.props.gameDate}]),
        "order": "gamePk"}
    };
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameDate !== this.props.gameDate) {
      this.setState({
        data: [],
        error: null,
        gameDate: this.props.gameDate,
        metadata: {"table": "NHLGame",
          "where": JSON.stringify([{'gameDate = ': this.props.gameDate}]),
          "order": "gamePk"}
      }, this.fetchData);
    }
  }
  fetchData() {
    const metadata = {"table": "NHLGame",
      "where": JSON.stringify([{'gameDate = ': this.state.gameDate}]),
      "order": "gamePk"};

    axios
      .get('https://nhl-data.herokuapp.com/api/table', {
        headers: metadata
        })
      .then(res => {
        this.setState({ data: _.uniq(res.data, "gamePk") })
      })
      .catch(error => this.setState({ error }));
  }

  gameSelected(game, event) {
    this.props.onClick(game);
  }
  render() {
    return (
        <div>
           {this.state.data.map((game, index) => (
             <div className="entity-box" key={game.gamePk} onClick={this.gameSelected.bind(this, game)}>
               <div className="field-date">{new Date(game.gameDate).toISOString().slice(0,10)}</div>
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
      )
  }
}

export default DateGameList;
