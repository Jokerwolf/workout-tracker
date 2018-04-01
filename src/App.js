//@flow
import React, { Component } from 'react';
import moment from 'moment';

import { Calendar } from './calendar';
import { PopupsContainer } from './popups-container';

import type {
  MonthsTp, MonthTp,
  DayTp, EmptyDayTp,
  TagTp,
  AddNotePopupModelTp
} from './shared/types';

import logo from './logo.svg';
import './App.css';

/****************************************************************************
* Types
****************************************************************************/
type UniqueKeyTp = {
  dayKey: string,
  monthKey: string;
};
type NoteTp = {
  uniqueKey: UniqueKeyTp,
  description: string,
  type: number;
};

type State = {
  months: MonthsTp,
  year: number,
  activePopupModel?: AddNotePopupModelTp,
  popupVisible: boolean,
  notes?: Array<NoteTp>

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
      popupVisible: false
    };
  }

  render() {
    const { popupVisible, year, activePopupModel, months } = this.state;
    return (
      <div className="App">
        <PopupsContainer show={popupVisible}
            onClose={(popupKey) => this.closePopup(popupKey)}
            onSave={(x) => this.saveNote(x)}
            model={activePopupModel}
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{year}</h1>
        </header>
        <div className="body">
          <button className="prev-button" onClick={() => this.goBack()}>Prev</button>
          <Calendar months={months.flatMonths} onShowPopup={(popupKey, x) => this.showPopup(popupKey, x)}/>
          <button className="next-button" onClick={() => this.goForward()}>Next</button>
        </div>
      </div>
    );
  }

  showPopup(popupKey: string, model: AddNotePopupModelTp) {
    console.log(`Popup ${popupKey} wants to be opened`);
    this.setState({popupVisible: true, activePopupModel: model})
  }

  closePopup(popupKey: string) {
    console.log(`Popup ${popupKey} wants to be closed`);
    this.setState({popupVisible: false, activePopupModel: undefined})
  }

  goBack() {
    const year = this.state.year - 1;

    const flatMonths = this.getMonths(year);
    const indexedMonths = this.indexArray(flatMonths, (x) => x.name) || {}
    const months = {flatMonths, ...indexedMonths};

    this.setState({year, months});
  }

  goForward() {
    const year = this.state.year + 1;

    const flatMonths = this.getMonths(year);
    const indexedMonths = this.indexArray(flatMonths, (x) => x.name) || {}
    const months = {flatMonths, ...indexedMonths};

    this.setState({year, months});
  }

  saveNote(note: NoteTp) {
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

    this.setState({months: newMonths});
  }

  /****************************************************************************
  * State initiation and update
  ****************************************************************************/
  getMonthName = (monthNum: number): string =>
    moment().month(monthNum).format('MMM');

  getMonths = (year: number): Array<MonthTp> => {
    const months = new Array(12).fill(1);
    const getForYear = this.getMonthDays(year);
    const shiftForViewYear = this.shiftForView(year);

    const getDays = (monthNum: number) => {
      const flatDays = shiftForViewYear(monthNum)(getForYear(monthNum).map(this.mapDay));
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

  mapDay = (day: any): DayTp => ({
    date: day.date(),
    tags: this.getRandomTags()
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
