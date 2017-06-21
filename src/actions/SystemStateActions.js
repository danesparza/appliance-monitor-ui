import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class SystemStateActions {

	//	Updates the 'system state' store
	recieveSystemState(stateData) {

		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_STATE,
		  stateData: stateData
		});

	}
}

export default new SystemStateActions();