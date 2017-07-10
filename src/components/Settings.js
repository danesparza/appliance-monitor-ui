//  React
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
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
                <h2>Settings page</h2>
                <p className="lead">Some settings stuff here</p>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Settings;