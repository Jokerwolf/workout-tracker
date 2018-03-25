//@flow
import React from 'react';

import './day.css';

type Props = {
    date: string;
    tags: Array<{ type: number; }>;
    showPopup: () => void;

};
const types = ['legs','arms','chest','back'];

const Day = (props: Props) => (
    <div className={getClass(props.tags)} onClick={() => props.showPopup()}>{props.date}</div>
);

function getClass(tags: Array<{ type: number }>) {
    return (tags || [])
        .map(tag => types[tag.type])
        .filter(x => x)
        .concat(['day'])
        .join(' ');
}

export { Day };
