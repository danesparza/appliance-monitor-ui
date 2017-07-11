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

class Settings extends Component {  

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
                    <label for="txtApplianceName" className="col-sm-3 col-form-label font-weight-bold">Appliance name</label>
                    <div className="col-sm-9">
                      <input id="txtApplianceName" className="form-control" type="text" value="The Dryer" aria-describedby="txtApplianceNameHelp"/>
                      <small id="txtApplianceNameHelp" className="text-muted">
                        Used in the web display and notifications
                      </small>
                    </div>                    
                  </div>

                  <hr/>

                  <div className="form-group row">                    
                    <label for="txtMinimumActivity" className="col-sm-3 col-form-label font-weight-bold">Minimum activity</label>
                    <div className="col-sm-9">
                      <input id="txtMinimumActivity" className="form-control" type="text" value="120" aria-describedby="txtMinimumActivityHelp"/>
                      <small id="txtMinimumActivityHelp" className="text-muted">
                        In seconds
                      </small>
                    </div>                    
                  </div>

                </div>

                <p className="lead text-muted">Notifications</p>
                <div className="rounded settings-group">                
                  
                  <div className="form-group row">                    
                    <label for="txtPushoverRecipient" className="col-sm-3 col-form-label font-weight-bold">Pushover recipient token</label>
                    <div className="col-sm-9">
                      <input id="txtPushoverRecipient" className="form-control" type="text" value="gqukgkJyLtchaLE41WUEJ2qFM7Q3tb" aria-describedby="txtPushoverRecipientHelp"/>
                      <small id="txtPushoverRecipientHelp" className="text-muted">
                        The token to send the notification to
                      </small>
                    </div>                    
                  </div>

                  <hr/>

                  <div className="form-group row">                    
                    <label for="txtPushoverAPIToken" className="col-sm-3 col-form-label font-weight-bold">Pushover API token</label>
                    <div className="col-sm-9">
                      <input id="txtPushoverAPIToken" className="form-control" type="text" value="ad2ujxv7zi7i5zw8fuvt5hu3chjuv4" aria-describedby="txtPushoverAPITokenHelp"/>
                      <small id="txtPushoverAPITokenHelp" className="text-muted">
                        Available on the Pushover site
                      </small>
                    </div>                    
                  </div>

                </div>

                <p className="lead text-muted">Advanced</p>
                <div className="rounded settings-group">                
                  
                  <div className="form-group row">                    
                    <label for="txtInfluxUrl" className="col-sm-3 col-form-label font-weight-bold">Influx server url</label>
                    <div className="col-sm-9">
                      <input id="txtInfluxUrl" className="form-control" type="text" value="http://chile.lan:8086" aria-describedby="txtInfluxUrlHelp"/>
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
                  <Button color="secondary">Cancel</Button>
                  <Button className="float-right" color="primary">Save</Button>
                </div>
              </Col>
            </Row>
            </form>

          </Container>          
        </div>
    );
  }
}

export default Settings;