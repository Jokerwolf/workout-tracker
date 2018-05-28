//@flow
import React from 'react';

import { AddNotePopup } from './add-note-popup';

import './popups-container.css';

/******************************************************************************
* Types
******************************************************************************/
type AddNotePopupModel = { uniqueKey: string };

const POPUPS = {
  "ADD_TO_NOTE": AddNotePopup
};

type Props = {
  show: { [k: $Keys<typeof POPUPS>]: AddNotePopupModel };
};

const PopupsContainer = (props: Props) => {
  debugger;
  const { show } = props;
  const showLayer = show && Object.keys(show).length > 0;

  return (
    <div className={`popups-container ${ showLayer ? 'show' : '' }`}>
    {
      Object.keys(show).map(key => {
        const Popup = POPUPS[key];
        return <Popup model={show[key]} {...props} />
      })
    }
    {/* <AddNotePopup {...props}/> */}
  </div>);
};

export { PopupsContainer };
