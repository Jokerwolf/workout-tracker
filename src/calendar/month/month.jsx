//@flow
import React from 'react';

import { Day } from '../day';

import './month.css';

type Props = {
    name: string;
    days: Array<{ date: string }>;
    showPopup: () => void;
};

const Month = (props: Props) => (
    <div className="month">
        <div className="name">{props.name}</div>
        <div className="days">
            {props.days.map((day, ind) => <Day key={ind} {...day} showPopup={props.showPopup}/>)}
        </div>
    </div>
);

export { Month };
