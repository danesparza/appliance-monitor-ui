import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class ActivityActions {

	//	Updates the 'system state' store
	receiveActivities(activityData) {

		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_ACTIVITIES,
		  activityData: activityData
		});

	}
}

export default new ActivityActions();