//@flow
import React from 'react';

import { AddNotePopupKey } from '../../popups-container/popup-keys';

import type { DayTp, TagTp } from '../../shared/types';

import './day.css';

/******************************************************************************
* Types
******************************************************************************/
type Props = DayTp & { onShowPopup: Function; };

const types = ['legs', 'arms', 'chest', 'back'];

const Day = (props: Props) => {
  const { tags, date, onShowPopup } = props;
  const emptyDay = date === undefined || date === null || date === '';

  if (emptyDay) {
    return <div className={getClass(tags, emptyDay)}></div>
  } else {
    return (
      <div className={getClass(tags, emptyDay)}
        onClick={() => onShowPopup(AddNotePopupKey, { dayKey: date })}>
          {date}
      </div>
    );
  }
};

function getClass(tags: ?Array<TagTp>, emptyDay: boolean) {
  return (tags || [])
    .map(tag => types[tag.type])
    .filter(x => x)
    .concat(emptyDay ? ['empty-day'] : ['day'])
    .join(' ');
}

export { Day };
