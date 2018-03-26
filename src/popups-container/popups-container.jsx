//@flow
import React from 'react';

import { AddNotePopup } from './add-note-popup';

import './popups-container.css';

type Props = {
  model: {uniqueKey: string},
  show: boolean;
  close: () => void;
};

const PopupsContainer = (props: Props) => (
  <div className={`popups-container ${props.show ? 'show' : ''}`}>
    <AddNotePopup {...props}/>
  </div>
);

export { PopupsContainer };
