//@flow
import React from 'react';

import { Month } from './month';

import './calendar.css';

/******************************************************************************
* Types
******************************************************************************/
type DayType = { date: string, uniqueKey: string };
type MonthType = { name: string, days: Array<DayType> };

type Props = {
    months: Array<MonthType>;
    showPopup: Function;
};

const Calendar = (props: Props) => (
    <div className="calendar">
        {props.months.map((month, ind) => <Month key={ind} {...month} showPopup={props.showPopup}/>)}
    </div>
);

export { Calendar };
