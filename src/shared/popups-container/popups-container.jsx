//@flow
import React from 'react';

import { Popup } from './popup';

import './popups-container.css';

type Props = {
    show: boolean;
    close: () => void;
};

const PopupsContainer = (props: Props) => (
    <div className={`popups-container ${props.show ? 'show' : ''}`}>
        <Popup popupKey="superPopup" close={props.close}>
            <div key="header">Hello</div>
            <div key="body">Body</div>
            <div key="footer">Footer</div>
        </Popup>
    </div>
);

export { PopupsContainer };
