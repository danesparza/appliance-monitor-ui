import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class SystemStateStore extends Store {

  constructor() {
    super(AppDispatcher);

    //  Set default system state
    this.systemState = {
      starttime:"2017-06-21T21:08:49.661875211-04:00",
      appversion:"",
      devicerunning:false}
  }

  getCurrentState() {
    return this.systemState;    
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case ActionTypes.RECEIVE_STATE:
        this.systemState = action.stateData;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new SystemStateStore();