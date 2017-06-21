//	App config
import appconfig from '../config'

//	Actions
import SystemStateActions from '../actions/SystemStateActions';

class CentralConfigAPIUtils {

	//	Gets the current system state from the service
	getCurrentState() 
	{
		//	Set the REST url
		let url = `${appconfig.serviceBaseUrl}/system/state`;

		fetch(url, {mode: 'cors'})
			.then(
				function (response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem. Status Code: ' + response.status);
						return;
					}

					// Examine the text in the response  
					response.json().then(function (data) {
						SystemStateActions.recieveSystemState(data);						
					});
				}
			)
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	}
}

export default new CentralConfigAPIUtils();