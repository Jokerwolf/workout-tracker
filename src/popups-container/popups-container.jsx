//@flow
import React from 'react';

import { AddNotePopup } from './add-note-popup';

import type { VisiblePopupsTp, AddNotePopupModelTp } from '../shared/types';

import './popups-container.css';

/******************************************************************************
* Types
******************************************************************************/
const POPUPS = {
  "ADD_TO_NOTE": AddNotePopup
};

type PopupModel = AddNotePopupModelTp;

type Props = {
  show: VisiblePopupsTp<typeof POPUPS, PopupModel>;
};

const PopupsContainer = (props: Props) => {
  const { show } = props;
  const showLayer = show && Object.keys(show).length > 0;

  return (
    <div className={`popups-container ${ showLayer ? 'show' : '' }`}>
    {
      Object.keys(show).map(key => {
        const Popup = POPUPS[key];
        return <Popup key={key} model={show[key]} {...props} />
      })
    }
  </div>);
};

export { PopupsContainer };
