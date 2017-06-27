import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//	App config
import appconfig from './config'

//	The API utils
import APIutils from './utils/APIutils';

//  Call API util methods:
APIutils.getCurrentState();
APIutils.getActivities();
APIutils.getAllConfigItems();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//	Listen to the websocket:
let wsprotocol = "ws:";
if(window.location.protocol === "https:"){ wsprotocol = "wss:"; }
let ws = new WebSocket(`${wsprotocol}//${appconfig.websocketBaseUrl}/ws`)
ws.addEventListener("message", function(e){     
    //  Get the latest version of activities and state:
    APIutils.getCurrentState();    
    APIutils.getActivities();
})