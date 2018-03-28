//@flow
import React from 'react';

import './day.css';

/******************************************************************************
* Types
******************************************************************************/
type TagType = { type: number };
type Props = {
  uniqueKey: string,
  date: string;
  tags: Array<TagType>;
  showPopup: Function;
};

const types = ['legs', 'arms', 'chest', 'back'];

const Day = (props: Props) => {
  const emptyDay = props.date === undefined || props.date === null || props.date === '';

  if (emptyDay) {
    return <div className={getClass(props.tags, emptyDay)}></div>
  } else {
    return <div className={getClass(props.tags, emptyDay)} onClick={() => props.showPopup({uniqueKey: props.uniqueKey})}>{props.date}</div>
  }
};

function getClass(tags: Array<TagType>, emptyDay: boolean) {
  return (tags || [])
    .map(tag => types[tag.type])
    .filter(x => x)
    .concat(emptyDay ? ['empty-day'] : ['day'])
    .join(' ');
}

export { Day };
