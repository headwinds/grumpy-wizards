import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Application from './views/Application.jsx';

// Stylesheet
require('./app.scss');

// Render the application
ReactDOM.render(
    <Application/>,
    document.getElementById('rootelement')
);
