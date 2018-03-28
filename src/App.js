//@flow
import React, { Component } from 'react';
import * as moment from 'moment';

import { Calendar } from './calendar';
import { PopupsContainer } from './popups-container';

import logo from './logo.svg';
import './App.css';

type Props = {};
type State = {
  months: Array<any>;
  year: number;
  activePopupModel: any,
  show: boolean;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const year = 2018;

    this.state = {
      year,
      months: this.getMonths(year),
      activePopupModel: undefined,
      show: false
    };
  }

  render() {
    const { show, year, activePopupModel } = this.state;
    return (
      <div className="App">
        <PopupsContainer show={show} close={() => this.closePopup()} save={(x) => this.save(x)} model={activePopupModel}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{year}</h1>
        </header>
        <div className="body">
          <button className="prev-button" onClick={() => this.goBack()}>Prev</button>
          <Calendar {...this.state} showPopup={(x) => this.showPopup(x)}/>
          <button className="next-button" onClick={() => this.goForward()}>Next</button>
        </div>
      </div>
    );
  }

  showPopup(model: { uniqueKey: string }) {
    this.setState({show: true, activePopupModel: model.uniqueKey})
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

  save(x) {
    console.log(`X: ${JSON.stringify(x)}`);
    // const month = this.state.months.find(m => m.days.some(d => d.uniqueKey === x.uniqueKey));
    // const monthIndex = this.state.months.findIndex(m => m.days.some(d => d.uniqueKey === x.uniqueKey));
    // console.log(month);
    //
    // const day = month.days.find(d => d.uniqueKey === x.uniqueKey);
  }

  /****************************************************************************
  * State initiation and update
  ****************************************************************************/
  getMonthName = (monthNum: number) => {
    return moment().month(monthNum).format('MMM')
  };

  getMonths = (year: number) => {
    const months = new Array(12).fill(1);
    const getForYear = this.getMonthDays(year);
    const shiftForViewYear = this.shiftForView(year);

    return months.map((_, ind) => ({
      name: this.getMonthName(ind),
      days: shiftForViewYear(ind)(getForYear(ind).map(this.mapDay))
    }));
  };

  shiftForView = (year: number) => (monthNum: number) => (days: Array<any>) => {
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

  getMonthDays = (year: number) => (monthNum: number) => {
    const month = moment().year(year).month(monthNum);

    const start = month.clone().startOf('month');
    const lengthInDays = month.clone().daysInMonth();

    const days = Array(month.daysInMonth());
    for (let i = 0, day = start.clone(); i <= lengthInDays - 1; i++) {
      days[i] = day.clone().add(i, 'day');
    }

    return days;
  }

  mapDay = (day: any) => ({
    uniqueKey: `${day.date()}_${day.month()}_${day.year()}`,
    date: day.date(),
    tags: [{type: this.getRandomType()}]
  });

  getRandomType = () => {
    const integer = this.getRandomInt(30);

    return integer > 3 ? undefined : integer;
  };

  getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));
}

export default App;
