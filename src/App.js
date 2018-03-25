import React, { Component } from 'react';
import * as moment from 'moment';

import { Calendar } from './calendar';
import { PopupsContainer } from './shared/popups-container';

import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: [
                { name: 'JAN', days: [
                    { date: '01', tags: [{type: 0}] },
                    { date: '02', tags: [{type: 1}] },
                    { date: '03' },
                    { date: '04' },
                    { date: '05' },
                    { date: '06' },
                    { date: '07' },
                    { date: '08', tags: [{type: 2}] },
                    { date: '09', tags: [{type: 1}] },
                    { date: '10' },
                    { date: '11', tags: [{type: 3}] },
                    { date: '12' },
                    { date: '13' },
                    { date: '14' },
                    { date: '15' },
                    { date: '16' },
                    { date: '17' },
                    { date: '18' },
                    { date: '19' },
                    { date: '20' },
                    { date: '21' },
                    { date: '22' },
                    { date: '23' },
                    { date: '24' },
                    { date: '25' },
                    { date: '26' },
                    { date: '27' },
                    { date: '28' },
                    { date: '29' },
                    { date: '30' },
                    { date: '31' }
                ] },
                { name: 'FEB', days: [{ date: '01' }, { date: '02' }, { date: '03', tags: [{type: 2}] }, { date: '04' }, { date: '05' }, { date: '06' }, { date: '07' }] },
                { name: 'MAR', days: [{ date: '01', tags: [{type: 1}]}, { date: '02' }, { date: '03' }, { date: '04' }, { date: '05' }, { date: '06' }, { date: '07' }] },
                { name: 'APR', days: [{ date: '01' }, { date: '02' }, { date: '03' }, { date: '04' }, { date: '05' }, { date: '06', tags: [{type: 3}]}, { date: '07' }] }
            ]
        };
    }

    render() {
        return (
            <div className="App">
                <PopupsContainer show={this.state.show} close={() => this.closePopup()}/>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Calendar {...this.state} showPopup={() => this.showPopup()}/>
            </div>
        );
    }

    showPopup() {
        this.setState({show: true})
    }

    closePopup() {
        this.setState({show: false})
    }
}

export default App;
