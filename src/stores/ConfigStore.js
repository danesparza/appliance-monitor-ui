import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class ConfigStore extends Store {

  constructor() {
    super(AppDispatcher);
    this.configItems = [];
  }

  //  Gets the appliance name
  getApplianceName() {
    console.log(this.getConfigValue("name"));
    return this.getConfigValue("name");
  }

  //  Gets a config value by name
  getConfigValue(configName) {
    //  Our default return value:
    let retval = "";
    
    //  See if the config value exists:
    for (var i = 0, len = this.configItems.length; i < len; i++) {
      if(this.configItems[i].name === configName)
      {
        retval = this.configItems[i].value;
      }
    }

    //  Return what we found
    return retval;
  }

  //  Gets all config values
  getAllConfigItems() {
    return this.configItems;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case ActionTypes.RECEIVE_CONFIG:
        this.configItems = action.configData;        
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new ConfigStore();