import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../actions/ActionTypes';
import moment from 'moment';

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
        
        //  Set the activities:
        let activityData = action.activityData;        

        if(activityData != null)
        {
          //  First, sort by date (most recent last):

          //  For each event, calculate the time elapsed from the previous:
          let previousDate = moment(new Date());

          let formattedActivityData = activityData.map(function(item) {
              
              //  Calculate the difference between the previous date
              //  and the current item's timestamp.  
              let timeDiff = moment(item.timestamp).from(previousDate, true);

              //  Set the previousDate to the current timestamp for the
              //  next iteration:
              previousDate = moment(item.timestamp);

              return {
                  timestamp: item.timestamp,
                  eventtype: item.eventtype,
                  timeElapsedFromPrevious: timeDiff                  
              };
          });

          //  Sort by date (most recent first)
          formattedActivityData.sort(function(a, b) {
              a = new Date(a.timestamp);
              b = new Date(b.timestamp);
              return a>b ? -1 : a<b ? 1 : 0;
          });
    
          //  Set the store array:
          this.activities = formattedActivityData;
        }

        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new ActivityStore();