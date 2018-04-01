//@flow
import React from 'react';

import { Day } from '../day';

import './month.css';

/******************************************************************************
* Types
******************************************************************************/
type Props = {
    name: string;
    days: Array<Day>;
    onShowPopup: Function;
};

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/******************************************************************************
* Component
******************************************************************************/
const Month = (props: Props) => {
  const { days, name, onShowPopup } = props;

  const handleShowPopup = (popupKey: string, rest: any) => {
    return onShowPopup(popupKey, { monthKey: name, ...rest });
  };

  return (
      <div className="month">
          <div className="name">{name}</div>
          <div className="days-of-week">
              {daysOfWeek.map((x, ind) => <div key={`dow_${ind}`} className="day-of-week">{x}</div>)}
          </div>
          <div className="days">
              {days.map((day, ind) => (
                <Day
                  key={ind}
                  {...day}
                  onShowPopup={(popupKey, dayKey) => handleShowPopup(popupKey, dayKey)}
                />
              ))}
          </div>
      </div>
  );
}

export { Month };
