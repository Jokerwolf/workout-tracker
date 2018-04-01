//@flow
import React from 'react';

import { Month } from './month';

import './calendar.css';

/******************************************************************************
* Types
******************************************************************************/
type Props = {
    months: Array<Month>;
    onShowPopup: Function;
};

/******************************************************************************
* Component
******************************************************************************/
const Calendar = (props: Props) => {
  const { months, onShowPopup } = props;

  return (
    <div className="calendar">
        {months.map((month) => {
          return (
            <Month key={month.name}
              name={month.name}
              days={month.days.flatDays} 
              onShowPopup={onShowPopup}
            />
          )
        })}
    </div>
  );
};

export { Calendar };
