import React, { Component } from 'react';
import axios from 'axios';

class GameEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
      game: this.props.game
    };
    this.fetchData(this.props.game.gamePk);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game !== this.props.game) {
      this.setState({
        data: [],
        error: null,
        game: this.props.game
      }, this.fetchData(this.props.game.gamePk));
    }
  }
  fetchData(gamePk) {
    const metadata = {
      "table": "vGameEventsNHL",
      "where": JSON.stringify([{"gamePk = ": gamePk}])
    }

    axios
      .get('https://nhl-data.herokuapp.com/api/table', {
        headers: metadata
        })
      .then(res => {
        console.log(res.data)
        this.setState({ data: res.data })
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
        <div>
           {this.state.data.map(item => (
             <div className="event-box" key={item.id} >
               <span>{item.description}</span>
             </div>
           ))}
         </div>
      )
  }
}

export default GameEvents;
