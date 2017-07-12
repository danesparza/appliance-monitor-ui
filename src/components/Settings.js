//  React
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

//  Components
import Navbar from './NavBar';

//  Stores
import ConfigStore from './../stores/ConfigStore';

//  API utils
import APIUtils from './../utils/APIutils';

class Settings extends Component {  

  constructor(){
    super();
    this.state = {
      ApplianceName: ConfigStore.getApplianceName(),
      MinimumActivity: ConfigStore.getConfigValue("monitorwindow"),
      PushoverAPIToken: ConfigStore.getConfigValue("pushoverapikey"),
      PushoverRecipient: ConfigStore.getConfigValue("pushoverrecipient"),
      InfluxUrl: ConfigStore.getConfigValue("influxserver")
    };

    //  Bind our events: 
    this._onChange = this._onChange.bind(this);
    this._onSave = this._onSave.bind(this);

    this._onApplianceNameChange = this._onApplianceNameChange.bind(this);
    this._onMinimumActivityChange = this._onMinimumActivityChange.bind(this);
  }

  componentDidMount(){    
     //  Add store listeners ... and notify ME of changes
	    this.configListener = ConfigStore.addListener(this._onChange);
  }

  componentWillUnmount() {
	    //  Remove store listeners
	    this.configListener.remove();
	}

  render() {

    return (
        <div>
          <Navbar {...this.props} />      
          <Container>

            <form>
            <Row>
              <Col>                
                <div className="page-heading">
                  <h2>Settings</h2>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>                
                <p className="lead text-muted">General</p>
                <div className="rounded settings-group">                
                  
                  <div className="form-group row">                    
                    <label htmlFor="txtApplianceName" className="col-sm-3 col-form-label font-weight-bold">Appliance name</label>
                    <div className="col-sm-9">
                      <input id="txtApplianceName" className="form-control" type="text" value={this.state.ApplianceName} onChange={this._onApplianceNameChange} maxLength="200" aria-describedby="txtApplianceNameHelp"/>
                      <small id="txtApplianceNameHelp" className="text-muted">
                        Used in the web display and notifications
                      </small>
                    </div>                    
                  </div>

                  <hr/>

                  <div className="form-group row">                    
                    <label htmlFor="txtMinimumActivity" className="col-sm-3 col-form-label font-weight-bold">Minimum activity</label>
                    <div className="col-sm-9">
                      <input id="txtMinimumActivity" className="form-control" type="number" step="1" min="5" max="600" value={this.state.MinimumActivity} onChange={this._onMinimumActivityChange} aria-describedby="txtMinimumActivityHelp"/>
                      <small id="txtMinimumActivityHelp" className="text-muted">
                        In seconds
                      </small>
                    </div>                    
                  </div>

                </div>

                <p className="lead text-muted">Notifications</p>
                <div className="rounded settings-group">                
                  
                  <div className="form-group row">                    
                    <label htmlFor="txtPushoverRecipient" className="col-sm-3 col-form-label font-weight-bold">Pushover recipient token</label>
                    <div className="col-sm-9">
                      <input id="txtPushoverRecipient" className="form-control" type="text" value={this.state.PushoverRecipient} maxLength="200" aria-describedby="txtPushoverRecipientHelp"/>
                      <small id="txtPushoverRecipientHelp" className="text-muted">
                        The token to send the notification to
                      </small>
                    </div>                    
                  </div>

                  <hr/>

                  <div className="form-group row">                    
                    <label htmlFor="txtPushoverAPIToken" className="col-sm-3 col-form-label font-weight-bold">Pushover API token</label>
                    <div className="col-sm-9">
                      <input id="txtPushoverAPIToken" className="form-control" type="text" value={this.state.PushoverAPIToken} maxLength="200" aria-describedby="txtPushoverAPITokenHelp"/>
                      <small id="txtPushoverAPITokenHelp" className="text-muted">
                        Available on the Pushover site
                      </small>
                    </div>                    
                  </div>

                </div>

                <p className="lead text-muted">Advanced</p>
                <div className="rounded settings-group">                
                  
                  <div className="form-group row">                    
                    <label htmlFor="txtInfluxUrl" className="col-sm-3 col-form-label font-weight-bold">Influx server url</label>
                    <div className="col-sm-9">
                      <input id="txtInfluxUrl" className="form-control" type="url" value={this.state.InfluxUrl} maxLength="200" aria-describedby="txtInfluxUrlHelp"/>
                      <small id="txtInfluxUrlHelp" className="text-muted">
                        Optional url to log debugging data.  If left blank, logging is disabled
                      </small>
                    </div>                    
                  </div>

                </div>

              </Col>
            </Row>
            
            <Row>
              <Col>                
                <div className="settings-actions">
                  <a href="#/" className="btn btn-secondary">Cancel</a>
                  <Button onClick={this._onSave} className="float-right" color="primary">Save</Button>
                </div>
              </Col>
            </Row>
            </form>

          </Container>          
        </div>
    );
  }

  _onApplianceNameChange(e){
    this.setState({
      ApplianceName: e.target.value
    });
  }
  
  _onMinimumActivityChange(e){
    this.setState({
      MinimumActivity: e.target.value
    });
  }

  _onChange() {
    this.setState({
      ApplianceName: ConfigStore.getApplianceName(),
      MinimumActivity: ConfigStore.getConfigValue("monitorwindow"),
      PushoverAPIToken: ConfigStore.getConfigValue("pushoverapikey"),
      PushoverRecipient: ConfigStore.getConfigValue("pushoverrecipient"),
      InfluxUrl: ConfigStore.getConfigValue("influxserver")
    });
  }

  _onSave(e) {
    e.preventDefault();
    
    //  Add the config items:
    let items = [];
    items.push({name: "name", value: this.state.ApplianceName});
    items.push({name: "monitorwindow", value: this.state.MinimumActivity});

    //  Save the settings:
    APIUtils.batchUpdateConfigItems(items);

    //  Navigate to the main page
    window.location.hash = "#/";
  }
}

export default Settings;