//@flow
import React, { Component } from 'react';

import { Popup } from '../popup';
import { Button } from '../../shared/button';

import './add-note-popup.css';

type Props = {
  model: { uniqueKey: string; },
  close: () => void;
  save: (x: any) => void;
};

type State = {
  description: string;
  type: number;
};

class AddNotePopup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);
    return (
      <Popup popupKey="addNotePopup" {...this.props}>
          <div key="header">Add Note for {this.props.model ? this.props.model.uniqueKey : ''}</div>
          <div key="body" className="add-note-body">
            <form className="add-note-form">
              <div className="left">
                <label htmlFor="description" className="control-label">Description</label>
                <textarea className="form-control" id="add-note-description" name="description" value={this.state.description} onChange={(event) => this.handleChange('description', event.target.value)}></textarea>
              </div>

              <div className="right">
                <label htmlFor="type" className="control-label">Type</label>
                <select className="form-control" name="type" value={this.state.type} onChange={(event) => this.handleChange('type', event.target.value)}>
                  <option value="0">Legs</option>
                  <option value="1">Arms</option>
                  <option value="2">Chest</option>
                  <option value="3">Back</option>
                </select>
              </div>
            </form>
          </div>
          <div key="footer" className="add-note-footer">
            <Button clickHandler={this.props.close}>Cancel</Button>
            <Button clickHandler={() => this.props.save(this.constructNote())}>Save</Button>
          </div>
      </Popup>
    )}

    handleChange(key: $Keys<State>, value: $Values<State>) {
      this.setState({[key]: value});
    }

    constructNote() {
      const note = {...this.state, uniqueKey: this.props.model.uniqueKey};
      console.log(note);
      return note;
    }
}

export { AddNotePopup };
