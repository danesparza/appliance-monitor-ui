import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class SystemStateStore extends Store {

  constructor() {
    super(AppDispatcher);
  }

  getCurrentState() {
    return this.appFilter;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case CentralConfigConstants.RECIEVE_APPFILTER:      
        console.log('Updating appfilter store.  New filter: ' + action.appFilter);
        this.appFilter = action.appFilter;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

module.exports = new SystemStateStore();