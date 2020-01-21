import React, { Component } from 'react';

class GamePerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      teamName: this.props.teamName,
      selectedDate: this.props.selectedDate
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.teamName !== this.props.teamName) {

      this.setState({
        data: this.props.data,
        teamName: this.props.teamName,
        selectedDate: this.props.selectedDate
      });
    }
  }

  render() {
    return (
        <div>
          <div className="entity-list">
           {this.state.data.map((item, index) => (
                <div key={index} className="entity-box game-performance">
                  <div>{ item.gameDate }</div>
                  <div>{ item.location }</div>
                  <div>{ item.performance }</div>
                  <div>{ item.gameMovingAvg3 }</div>
                  <div>{ item.gameMovingAvg10 }</div>
                  <div>{ item.outcome }</div>
                </div>
           ))}
          </div>
         </div>
      )
  }
}

export default GamePerformance;
