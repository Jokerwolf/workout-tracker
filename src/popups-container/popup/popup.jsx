//@flow
import React from 'react';

import './popup.css';

type Props = {
    close: (key: string) => void,
    children: any,
    popupKey: string;
};

const getChildComponent = (children) => (key) => {
    if (!children) {
        throw `Should have at least 1 child with 'body' key`;
    }

    let child = undefined;
    React.Children.forEach(children, (ch) => {
        if (ch.key === key) {
            child = ch;
        }
    });
    if (!child) {
        if (key === 'body') {
            throw `Should have at least 1 child with 'body' key`;
        }
        return undefined;
    } else {
        return child;
    }
}

const Popup = (props: Props) => {
    const getChild = getChildComponent(props.children);

    return (
        <div className="popup">
            <div className="body-container">
                <div className="header">
                    { getChild('header')}
                    <span className="close" onClick={() => props.close(props.popupKey)}>&times;</span>
                </div>
                { getChild('body') }
            </div>
            <div className="footer">
                { getChild('footer') }
            </div>
        </div>
    );
};

export { Popup };
