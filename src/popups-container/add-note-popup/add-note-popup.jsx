//@flow
import React, { Component } from 'react';

import { Popup } from '../popup';
import { Button } from '../../shared/button';
import { AddNotePopupKey } from '../popup-keys';

import type { AddNotePopupModelTp } from '../../shared/types';

import './add-note-popup.css';

/****************************************************************************
* Types
****************************************************************************/
type Props = {
  model: AddNotePopupModelTp,
  onClose: (popupKey: string) => void;
  onSave: (popupKey: string, x: any) => void;
};

type State = {
  description: ?string;
  type: ?number;
};

/****************************************************************************
* Component
****************************************************************************/
class AddNotePopup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      description: undefined,
      type: 0
    };
  }

  render() {
    const { model, onSave, onClose } = this.props;

    return (
      <Popup popupKey={AddNotePopupKey} {...this.props}>
          <div key="header">Add Note for {model ? `${model.dayKey} ${model.monthKey}` : ''}</div>
          <div key="body" className="add-note-body">
            <form className="add-note-form">
              <div className="left">
                <label htmlFor="description" className="control-label">Description</label>
                <textarea className="form-control"
                  id="add-note-description"
                  name="description"
                  value={this.state.description}
                  onChange={(event) => this.handleChange('description', event.target.value)}>
                </textarea>
              </div>

              <div className="right">
                <p>
                  <label htmlFor="type" className="control-label">Type</label>
                  <select
                    className="form-control"
                    name="type"
                    value={this.state.type}
                    onChange={(event) => this.handleChange('type', event.target.value)}>
                    <option value="0">Legs</option>
                    <option value="1">Arms</option>
                    <option value="2">Chest</option>
                    <option value="3">Back</option>
                  </select>
                </p>
                <p>
                  <label>Notes</label>
                  <ul>
                  {(model.notes || []).map((note, index) => (
                    <li key={index}>
                      {note.description}
                      <br />
                      {note.type}
                    </li>
                  ))}
                  </ul>
                </p>
              </div>
            </form>
          </div>
          <div key="footer" className="add-note-footer">
            <Button clickHandler={() => onClose(AddNotePopupKey)}>Cancel</Button>
            <Button clickHandler={() => onSave(AddNotePopupKey, this.constructNote())}>Save</Button>
          </div>
      </Popup>
    )}

    handleChange(key: $Keys<State>, value: any) {
      this.setState({[key]: value});
    }

    constructNote() {
      const note = {
        ...this.state,
        uniqueKey: {
          dayKey: this.props.model.dayKey,
          monthKey: this.props.model.monthKey
        }
      };

      return note;
    }
}

export { AddNotePopup };
