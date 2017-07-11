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
            
            <Row>
              <Col>                
                <div className="page-heading">
                  <h2>Settings</h2>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>                
                <p className="lead">General</p>
                <div className="rounded settings-group">
                  Some settings stuff here
                </div>
              </Col>
            </Row>
            
            <Row>
              <Col>                
                <div>
                  <Button color="secondary">Cancel</Button>
                  <Button className="float-right" color="primary">Save</Button>
                </div>
              </Col>
            </Row>
          </Container>          
        </div>
    );
  }
}

export default Settings;