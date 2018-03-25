import React, { Component } from 'react';
import * as moment from 'moment';

import { Calendar } from './calendar';
import { PopupsContainer } from './shared/popups-container';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      months: this.getMonths()
    };
  }

  render() {
    return (
      <div className="App">
        <PopupsContainer show={this.state.show} close={() => this.closePopup()}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Calendar {...this.state} showPopup={() => this.showPopup()}/>
      </div>
    );
  }

  showPopup() {
    this.setState({show: true})
  }

  closePopup() {
    this.setState({show: false})
  }

  /****************************************************************************
  * State initiation
  ****************************************************************************/
  getMonthName = (monthNum) => {
    return moment().month(monthNum).format('MMM')
  };

  getMonths = () => {
    const months = new Array(12).fill(1);
    return months.map((_, ind) => ({name: this.getMonthName(ind), days: this.getMonthDays(ind).map(this.mapDay)}));
  };

  getMonthDays = (monthNum) => {
    const month = moment().month(monthNum);

    const start = month.clone().startOf('month');
    const lengthInDays = month.clone().daysInMonth();

    const days = Array(month.daysInMonth());
    for (let i = 0, day = start.clone(); i <= lengthInDays - 1; i++) {
      days[i] = day.clone().add(i, 'day');
    }

    return days;
  }

  mapDay = (day) => ({
    date: day.date(),
    tags: [{type: this.getRandomType()}]
  });

  getRandomType = () => {
    const integer = this.getRandomInt(30);

    return integer > 3 ? undefined : integer;
  };

  getRandomInt = (max) =>
    Math.floor(Math.random() * Math.floor(max));
}

export default App;
