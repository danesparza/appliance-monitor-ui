import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//	The API utils
import APIutils from './utils/APIutils';
APIutils.getCurrentState();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
