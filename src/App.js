//@flow
import React, { Component } from 'react';
import moment from 'moment';

import { Calendar } from './calendar';
import { PopupsContainer } from './popups-container';

import type {
  MonthsTp, MonthTp,
  DayTp, EmptyDayTp,
  TagTp,
  VisiblePopupsTp,
  NotesTp, NoteTp
} from './shared/types';

import logo from './logo.svg';

import './App.css';

/****************************************************************************
* Types
****************************************************************************/
type State = {
  months: MonthsTp,
  year: number,
  visiblePopups: VisiblePopupsTp<*, *>,
  notes: ?NotesTp
};

type Props = {};

/****************************************************************************
* Component
****************************************************************************/

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const year = 2018;

    const flatMonths: Array<MonthTp> = this.getMonths(year);
    const indexedMonths: {[monthKey: string]: MonthTp} = this.indexArray(flatMonths, (x) => x.name) || {};
    const months: MonthsTp = {...indexedMonths, flatMonths};

    this.state = {
      year,
      months,
      activePopupModel: undefined,
      visiblePopups: {},
      notes: undefined
    };
  }

  render() {
    const { visiblePopups, year, months } = this.state;
    return (
      <div className="App">
        <PopupsContainer show={visiblePopups}
            onClose={(popupKey) => this.closePopup(popupKey)}
            onSave={(popupKey, model) => this.saveNote(popupKey, model)}
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <div className="year-panel">
            <div className="navigation-button left" onClick={() => this.goBack()}>
              <svg version="1.1" id="triangle-prev" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              	viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
              		<polygon className="triangle-polygon"
                    fill="#FFFFFF" stroke="#FFFFFF"
                    strokeMiterlimit="10"
                    points="3.6,44.5 25.3,7 46.9,44.5"
                  />
              </svg>
            </div>

            <h1 className="App-title">{year}</h1>

            <div className="navigation-button right" onClick={() => this.goForward()}>
              <svg version="1.1" id="triangle-next" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              	viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
              		<polygon className="triangle-polygon"
                    fill="#FFFFFF" stroke="#FFFFFF"
                    strokeMiterlimit="10"
                    points="3.6,44.5 25.3,7 46.9,44.5"
                  />
              </svg>
            </div>
          </div>
        </header>
        <div className="body">
          <Calendar months={months.flatMonths} onShowPopup={(popupKey, x) => this.showPopup(popupKey, x)}/>
        </div>
      </div>
    );
  }

  showPopup(popupKey: string, model: {monthKey: number | string, dayKey: number | string}) {
    console.log(JSON.stringify(model));
    const uniqueKey = this.uniqueKeyConstructor((this.state || {}).year, model.monthKey, model.dayKey);

    this.setState({visiblePopups: {[popupKey]: Object.assign({}, model, {notes: (this.state.notes || {})[uniqueKey]})}})
  }

  closePopup(popupKey: string) {
    delete this.state.visiblePopups[popupKey];
    this.setState({visiblePopups: this.state.visiblePopups})
  }

  goBack() {
    const year = this.state.year - 1;

    const flatMonths = this.getMonths(year);
    const indexedMonths = this.indexArray(flatMonths, (x) => x.name) || {}
    const months = { flatMonths, ...indexedMonths };

    this.setState({year, months});
  }

  goForward() {
    const year = this.state.year + 1;

    const flatMonths = this.getMonths(year);
    const indexedMonths = this.indexArray(flatMonths, (x) => x.name) || {}
    const months = { flatMonths, ...indexedMonths };

    this.setState({year, months});
  }

  saveNote(popupKey: string, note: NoteTp) {
    const month = this.state.months[note.uniqueKey.monthKey];
    const day = month.days[note.uniqueKey.dayKey];

    const newDay = Object.assign({}, day, { tags: [{type: note.type}] });
    const newDays = Object.assign({}, month.days, { [newDay.date]: newDay });
    const { flatDays, ...indexedDays } = newDays;

    const newFlatDays: Array<DayTp> = this.flatObject(indexedDays) || [];
    newDays.flatDays = this.shiftForView(this.state.year)(month.index)(newFlatDays);

    const newMonth = Object.assign({}, month, { days: newDays });
    const newMonths = Object.assign({}, this.state.months, {[newMonth.name]: newMonth});
    const { flatMonths, ...indexedMonths } = newMonths;

    const newFlatMonth: Array<MonthTp> = this.flatObject(indexedMonths) || [];
    newMonths.flatMonths = newFlatMonth;

    const uniqueKey = this.uniqueKeyConstructor((this.state || {}).year, note.uniqueKey.monthKey, note.uniqueKey.dayKey);
    const byKeyNotes = (this.state.notes || {})[uniqueKey] || [];
    const newByKeyNotes = [...byKeyNotes, note];
    const newNotes = Object.assign({}, this.state.notes, {[uniqueKey]: newByKeyNotes});
    this.setState({months: newMonths, notes: newNotes});

    this.closePopup(popupKey);
  }

  /****************************************************************************
  * State initiation and update
  ****************************************************************************/
  uniqueKeyConstructor = (year: number, monthKey: number | string, dayKey: number | string) =>
    `${year}_${monthKey}_${dayKey}`;

  getMonthName = (monthNum: number): string =>
    moment().month(monthNum).format('MMM');

  getMonths = (year: number): Array<MonthTp> => {
    const months = new Array(12).fill(1);
    const getForYear = this.getMonthDays(year);
    const shiftForViewYear = this.shiftForView(year);
    const getType = (month, date) => {
      const uniqueKey = this.uniqueKeyConstructor(year, month, date);
      const notes = ((this.state || {}).notes || {})[uniqueKey] || [];
      return (notes[0] || {}).type;
    };

    const getDays = (monthNum: number) => {
      const days = getForYear(monthNum).map((day) => this.mapDay(day, getType(this.getMonthName(monthNum), day.date())));
      const flatDays = shiftForViewYear(monthNum)(days);
      const indexedDays = this.indexArray(
        flatDays,
        (x: DayTp | EmptyDayTp) => {
          if (typeof x.date === 'number') {
            return x.date;
          }

          return -1;
        }) || {};

      return { flatDays, ...indexedDays };
    };

    return months.map((_, ind) => ({
      index: ind,
      name: this.getMonthName(ind),
      days: getDays(ind)
    }));
  };

  shiftForView = (year: number) => (monthNum: number) => (days: Array<any>): Array<DayTp | EmptyDayTp> => {
    const totalCells = 42; // 6 rows of 7 days

    const month = moment().year(year).month(monthNum);
    const start = month.clone().startOf('month').weekday();
    const lengthInDays = month.clone().daysInMonth();

    const prefix = start;
    const postfix = totalCells - (prefix + lengthInDays);

    return new Array(prefix).fill(({date: undefined}: EmptyDayTp))
      .concat(days)
      .concat(new Array(postfix).fill(({date: undefined}: EmptyDayTp)));
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

  mapDay = (day: any, type: number): DayTp => ({
    date: day.date(),
    tags: [{type}]
  });

  getRandomTags = (): Array<TagTp> | void => {
    const type = this.getRandomType();
    return type ? [{type: type}] : undefined;
  }

  getRandomType = () => {
    const integer = this.getRandomInt(30);
    return integer > 3 ? undefined : integer;
  };


  /****************************************************************************
  * Utility functions
  ****************************************************************************/
  getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));

  indexArray<T: any>(arr: Array<T>, keySelector: (el: T) => $Values<T>) {
    if (!arr || arr.length <= 0) return null;

    return arr.reduce((acc, cur) => Object.assign(acc, {[keySelector(cur)]: cur}), {});
  }

  flatObject<K: any, T: {[k: string | number]: K}>(source: T): ?Array<K> {
    if (source === undefined || source === null) return null;

    return ((Object.values(source): any): Array<K>);
  };
}

export default App;
