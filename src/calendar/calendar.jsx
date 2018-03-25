//@flow
import React from 'react';

import { Month } from './month';

import './calendar.css';

type Props = {
    months: Array<{name: string}>;
    showPopup: () => void;
};

const Calendar = (props: Props) => (
    <div className="calendar">
        {props.months.map((month, ind) => <Month key={ind} {...month} showPopup={props.showPopup}/>)}
    </div>
);

export { Calendar };
