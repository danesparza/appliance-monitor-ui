import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class ConfigStore extends Store {

  constructor() {
    super(AppDispatcher);
  }

  getAllConfigItems() {
    return this.configItems;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case ActionTypes.RECEIVE_CONFIG:      
        console.log('Updating config store.');
        console.log(action.configData);
        this.configItems = action.configData;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new ConfigStore();