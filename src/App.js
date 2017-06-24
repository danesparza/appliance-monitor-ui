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
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  Moment
import moment from 'moment';

//  Components
import ActivityItem from './components/ActivityItem';

//  Stores
import SystemStateStore from './stores/SystemStateStore'
import ActivityStore from './stores/ActivityStore'
import ConfigStore from './stores/ConfigStore'

let badgeRunning = <Badge color="success">running</Badge>;
let badgeNotRunning = <Badge>not running</Badge>;

class App extends Component {  

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      systemState:{},
      configItems: [],
      activityItems: [],
      mostRecentActivity: {}
    };

    //  Bind our events: 
    this._onChange = this._onChange.bind(this);

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
	    //  Add store listeners ... and notify ME of changes
	    this.systemStateListener = SystemStateStore.addListener(this._onChange);
      this.configListener = ConfigStore.addListener(this._onChange);
      this.activityListener = ActivityStore.addListener(this._onChange);
	}

	componentWillUnmount() {
	    //  Remove store listeners
	    this.systemStateListener.remove();
      this.activityListener.remove();
      this.configListener.remove();
	}

  render() {
    //  First, see if the device is running:
    let runState = badgeNotRunning;
    let runStateText = "stopped";
    if(this.state.systemState.devicerunning === true)
    {
      runState = badgeRunning;
      runStateText = "running";
    }

    let timeSinceState = "time immemorial";
    if(this.state.mostRecentActivity != null)
    {
      timeSinceState = moment(this.state.mostRecentActivity.timestamp).fromNow(true);
    }


    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="#/">Appliance monitor <small>v{this.state.systemState.appversion}</small></NavbarBrand>
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
                <h2>The Dryer is {runState}</h2>
                <p className="lead">It has been {runStateText} for {timeSinceState}.</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>

            <p className="lead">Recent activity:</p>
           
            <section id="cd-timeline" className="cd-container">
              
            {this.state.activityItems.map(function(activityItem) {
              return <ActivityItem key={activityItem.timestamp} activity={activityItem}/>;
            })}

            </section> 

          </Container>
      </div>
    );
  }

  _onChange() {
    this.setState({
      systemState: SystemStateStore.getCurrentState(),
      configItems: ConfigStore.getAllConfigItems(),
      activityItems: ActivityStore.getAllActivities(),
      mostRecentActivity: ActivityStore.getMostRecentActivity()
    });
  }

}

export default App;