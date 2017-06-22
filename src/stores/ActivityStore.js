import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class ActivityStore extends Store {

  constructor() {
    super(AppDispatcher);
  }

  getAllActivities() {
    return this.activities;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case ActionTypes.RECEIVE_ACTIVITIES:      
        console.log('Updating activity store.');
        console.log(action.activityData);
        this.activities = action.activityData;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new ActivityStore();