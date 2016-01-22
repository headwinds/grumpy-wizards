import { StyleRoot } from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PageView from './pageview.jsx';

// support tap events
injectTapEventPlugin();

let pageStyle = {
    bottom: 0,
    left: 0,
    margin: 0,
    padding: 0,
    position: 'fixed',
    right: 0,
    top: 0
};

// render the page
ReactDOM.render(<StyleRoot style={pageStyle}><PageView/></StyleRoot>, document.getElementById('pageview'));
