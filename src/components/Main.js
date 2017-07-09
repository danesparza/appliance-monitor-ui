//  React and reactstrap
import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Badge,
} from 'reactstrap';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  Moment
import moment from 'moment';

//  Components
import ActivityItem from './ActivityItem';

let badgeRunning = <Badge color="success">running</Badge>;
let badgeNotRunning = <Badge>not running</Badge>;

class Main extends Component {  

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,     
    };    
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    //  First, see if the device is running:
    let runState = badgeNotRunning;
    let runStateText = "stopped";
    if(this.props.systemState.devicerunning === true)
    {
      runState = badgeRunning;
      runStateText = "running";
    }

    let timeSinceState = "time immemorial";
    if(this.props.mostRecentActivity != null)
    {
      timeSinceState = moment(this.props.mostRecentActivity.timestamp).fromNow(true);
    }

    //  Get the appliance name:
    let applianceName = this.props.applianceName || "";

    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="#/">Appliance monitor <small>v{this.props.systemState.appversion}</small></NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#/settings">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/danesparza/appliance-monitor">Help</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h2>{applianceName} is {runState}</h2>
                <p className="lead">It has been {runStateText} for {timeSinceState}.</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
            <p className="lead">Recent activity:</p>           
            <section id="cd-timeline" className="cd-container">          
              {this.props.activityItems.map(function(activityItem) {
                return <ActivityItem key={activityItem.timestamp} name={applianceName} activity={activityItem}/>;
              })}
            </section>
          </Container>
      </div>
    );
  }

}

export default Main;