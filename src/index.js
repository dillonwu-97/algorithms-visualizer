import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './App.css'

ReactDOM.render(
    <div className="app">
        <Router>
            <App />
        </Router>
    </div>,
    document.getElementById('root')
);

