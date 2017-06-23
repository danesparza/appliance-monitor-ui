import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';

class ActivityStore extends Store {

  constructor() {
    super(AppDispatcher);

    //  Default to an empty array
    this.activities = [];
  }

  //  Gets the most recent activity
  getMostRecentActivity(){

    //  The default activity is "unknown"
    let retval = {eventtype: 0, timestamp: "2017-05-13T20:31:36.091699065-04:00"}    
    
    //  If we have some activities, return the most recent:
    if(this.activities.length > 0){
      retval = this.activities[0];
    }

    return retval;
  }

  //  Gets all activities
  getAllActivities() {
    return this.activities;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case ActionTypes.RECEIVE_ACTIVITIES:      
        console.log('Updating activity store: ', action);

        //  Set the activities:
        this.activities = action.activityData;
        if(this.activities != null)
        {
          //  Sort by date (most recent first)
          this.activities.sort(function(a, b) {
              a = new Date(a.timestamp);
              b = new Date(b.timestamp);
              return a>b ? -1 : a<b ? 1 : 0;
          });
        }

        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new ActivityStore();