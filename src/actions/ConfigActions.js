import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class ConfigActions {

	//	Updates the 'config' store
	recieveConfigItems(configData) {

		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_CONFIG,
		  configData: configData
		});

	}
}

export default new ConfigActions();