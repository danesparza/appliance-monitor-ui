import React from 'react';
import ReactDOM from 'react-dom';

//  Components
import App from './App';
// import Main from './components/Main';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

//	App config
import appconfig from './config'

//	The API utils
import APIutils from './utils/APIutils';

//  Images
import applianceIcon from './washing-machine.png';

//  Call API util methods:
APIutils.getCurrentState();
APIutils.getActivities();
APIutils.getAllConfigItems();

ReactDOM.render(<App/>, document.getElementById('root'))

registerServiceWorker();

//  Request permissions for notifications:
if (("Notification" in window)) {
    Notification.requestPermission();    
}

//	Listen to the websocket:
let wsprotocol = "ws:";
let baseUrl = window.location.host;
if(window.location.protocol === "https:"){ wsprotocol = "wss:"; }
if(appconfig.serviceBaseHostPort){baseUrl = `//${appconfig.serviceBaseHostPort}`; }
let ws = new WebSocket(`${wsprotocol}//${baseUrl}/ws`)
ws.addEventListener("message", function(e){
    //  TODO: Check to see what should be updated
    //  (it could be config, activities/state, or something else)

    //  Get the latest version of activities and state:
    APIutils.getCurrentState();    
    APIutils.getActivities();

    //  TODO: Check to see if this is a type of message we
    //  want to send notifications about:
    desktopNotify("Appliance monitor", e.data);
})

function desktopNotify(theTitle, theBody) {

    var options = {
        body: theBody,
        icon: applianceIcon
    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        return; //  We don't support notifications:
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        new Notification(theTitle, options);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                new Notification(theTitle, options);
            }
        });
    }

    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
}