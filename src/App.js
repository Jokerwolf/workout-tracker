import React, { Component } from 'react';
import * as moment from 'moment';

import { Calendar } from './calendar';
import { PopupsContainer } from './shared/popups-container';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const year = 2018;

    this.state = {
      year,
      months: this.getMonths(year)
    };
  }

  render() {
    return (
      <div className="App">
        <PopupsContainer show={this.state.show} close={() => this.closePopup()}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.year}</h1>
        </header>
        <div className="body">
          <button className="prev-button" onClick={() => this.goBack()}>Prev</button>
          <Calendar {...this.state} showPopup={() => this.showPopup()}/>
          <button className="next-button" onClick={() => this.goForward()}>Next</button>
        </div>
      </div>
    );
  }

  showPopup() {
    this.setState({show: true})
  }

  closePopup() {
    this.setState({show: false})
  }

  goBack() {
    const year = this.state.year - 1;
    this.setState({year, months: this.getMonths(year)});
  }

  goForward() {
    const year = this.state.year + 1;

    this.setState({year, months: this.getMonths(year)});
  }

  /****************************************************************************
  * State initiation
  ****************************************************************************/
  getMonthName = (monthNum) => {
    return moment().month(monthNum).format('MMM')
  };

  getMonths = (year) => {
    const months = new Array(12).fill(1);
    const getForYear = this.getMonthDays(year);
    const shiftForViewYear = this.shiftForView(year);

    return months.map((_, ind) => ({
      name: this.getMonthName(ind),
      days: shiftForViewYear(ind)(getForYear(ind).map(this.mapDay))
      // days: getForYear(ind).map(this.mapDay)
    }));
  };

  shiftForView = (year) => (monthNum) => (days) => {
    const totalCells = 42; // 6 rows of 7 days

    const month = moment().year(year).month(monthNum);
    const start = month.clone().startOf('month').weekday();
    const lengthInDays = month.clone().daysInMonth();

    const prefix = start;
    const postfix = totalCells - (prefix + lengthInDays);

    return new Array(prefix).fill({})
      .concat(days)
      .concat(new Array(postfix).fill({}));
  }

  getMonthDays = (year) => (monthNum) => {
    const month = moment().year(year).month(monthNum);

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
