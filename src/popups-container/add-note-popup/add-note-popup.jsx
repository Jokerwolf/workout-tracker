//@flow
import React, { Component } from 'react';

import { Popup } from '../popup';

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
            <form className="form">
              <label>Description
                <textarea className="form-control" name="description" value={this.state.description} onChange={(event) => this.handleChange('description', event.target.value)}></textarea>
              </label>
              <label>Type
                <select className="form-control" name="type" value={this.state.type} onChange={(event) => this.handleChange('type', event.target.value)}>
                  <option value="0">Legs</option>
                  <option value="1">Arms</option>
                  <option value="2">Chest</option>
                  <option value="3">Back</option>
                </select>
              </label>
            </form>
          </div>
          <div key="footer" className="add-note-footer">
            <button onClick={() => this.props.close()}>Cancel</button>
            <button onClick={() => this.props.save(this.constructNote())}>Save</button>
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
