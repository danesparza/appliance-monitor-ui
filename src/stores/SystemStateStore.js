import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class SystemStateStore extends Store {

  constructor() {
    super(AppDispatcher);
  }

  getCurrentState() {
    return this.systemState;    
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case ActionTypes.RECEIVE_STATE:      
        console.log('Updating current state store.');
        console.log(action.stateData);
        this.systemState = action.stateData;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new SystemStateStore();