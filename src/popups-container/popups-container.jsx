//@flow
import React from 'react';

import { AddNotePopup } from './add-note-popup';

import './popups-container.css';

/******************************************************************************
* Types
******************************************************************************/
type AddNotePopupModel = { uniqueKey: string };

type Props = {
  model: AddNotePopupModel,
  show: boolean;
};

const PopupsContainer = (props: Props) => (
  <div className={`popups-container ${props.show ? 'show' : ''}`}>
    <AddNotePopup {...props}/>
  </div>
);

export { PopupsContainer };
