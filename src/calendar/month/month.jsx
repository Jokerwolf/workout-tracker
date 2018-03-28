//@flow
import React from 'react';

import { Day } from '../day';

import './month.css';

/******************************************************************************
* Types
******************************************************************************/
type TagType = { type: number };
type DayType = { date: string, uniqueKey: string, tags: Array<TagType> };
type Props = {
    name: string;
    days: Array<DayType>;
    showPopup: Function;
};

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Month = (props: Props) => (
    <div className="month">
        <div className="name">{props.name}</div>
        <div className="days-of-week">
            {daysOfWeek.map((x, ind) => <div key={ind} className="day-of-week">{x}</div>)}
        </div>
        <div className="days">
            {props.days.map((day, ind) => <Day key={ind} {...day} showPopup={props.showPopup}/>)}
        </div>
    </div>
);

export { Month };
