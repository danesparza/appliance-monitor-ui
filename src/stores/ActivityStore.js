import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class ActivityStore extends Store {

  constructor() {
    super(AppDispatcher);

    //  Default to an empty array
    this.activities = [];
  }

  getAllActivities() {
    return this.activities;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case ActionTypes.RECEIVE_ACTIVITIES:      
        console.log('Updating activity store: ', action);
        this.activities = action.activityData;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new ActivityStore();