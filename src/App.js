//  React and reactstrap
import React, { Component } from 'react';
import {Router, Route} from 'react-enroute';

//  Components
import Main from './components/Main';
import Settings from './components/Settings';
import NotFound from './components/NotFound';

//  Stores
import SystemStateStore from './stores/SystemStateStore'
import ActivityStore from './stores/ActivityStore'
import ConfigStore from './stores/ConfigStore'

//  Stylesheets & images
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const getHash = hash => {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 1) === '#') {
      return hash.substring(1);
    }
    return hash;
  }
  return '/';
};

class App extends Component {  

  constructor(){
    super();
    this.state = {
      location: getHash(window.location.hash),
      systemState:{},
      activityItems: [],
      mostRecentActivity: {}
    };

    //  Bind our events: 
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  hashChangeHandler(e) {
    this.setState({
        location: getHash(window.location.hash)
    });
  }

  componentDidMount(){    
    //  Add a hash change listener:
    window.addEventListener("hashchange", this.hashChangeHandler);

     //  Add store listeners ... and notify ME of changes
	    this.systemStateListener = SystemStateStore.addListener(this._onChange);
      this.configListener = ConfigStore.addListener(this._onChange);
      this.activityListener = ActivityStore.addListener(this._onChange);
  }

  componentWillUnmount() {
	    //  Remove store listeners
	    this.systemStateListener.remove();
      this.activityListener.remove();
      this.configListener.remove();
	}

  render() {
    //  Get the appliance name:
    let applianceName = ConfigStore.getApplianceName();

    return (
      <Router {...this.state} applianceName={applianceName}>
        <Route path="/" component={Main} />
        <Route path="/settings" component={Settings} />
        <Route path="*" component={NotFound} />
      </Router>
    );
  }

  _onChange() {
    this.setState({
      systemState: SystemStateStore.getCurrentState(),
      activityItems: ActivityStore.getAllActivities(),
      mostRecentActivity: ActivityStore.getMostRecentActivity()
    });
  }

}

export default App;