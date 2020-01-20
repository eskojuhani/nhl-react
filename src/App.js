import React, { Component } from 'react';
import './App.css';
import DateGameList from './components/DateGameList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      searchTerm: new Date().toISOString().slice(0,10)
    };
  }
  /*
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps);
    if (nextProps.searchTerm !== prevState.searchTerm) {
      return {
        searchTerm: nextProps.searchTerm
      };
    }
    return null;
  }*/

  setDate(change) {
    console.log("setDate", this.state.selectedDate, change);
    var d = new Date(this.state.selectedDate);
    d.setDate(d.getDate() + change);
    this.setState({
      selectedDate: d,
      searchTerm: d.toISOString().slice(0,10)
    });
    return d.toISOString().slice(0,10);
  }

  render() {
    //selectedDate.setUTCHours(0, 0, 0, 0);

    return (
      <div className="App">
        <div className="entity-section entity-section-light">
          <div className="container" key="a1">
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
                <DateGameList gameDate={ this.state.searchTerm } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
