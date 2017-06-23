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
  Button,
  Badge,
  Table,
} from 'reactstrap';

//  Stylesheets
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

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
      activityItems: []
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
    if(this.state.systemState.devicerunning === true)
    {
      runState = badgeRunning;
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
                <p className="lead">It has been stopped for 12 minutes.</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
            <p className="lead">Recent activity</p>
            <Table>
              <tbody>
                <tr>
                  <th scope="row">2:23pm</th>
                  <td>The dryer started</td>
                </tr>
                <tr>
                  <th scope="row">1:12pm</th>
                  <td>The dryer stopped.  It ran for 45 minutes.</td>                  
                </tr>
                <tr>
                  <th scope="row">12:27pm</th>
                  <td>The dryer started.</td>                  
                </tr>
              </tbody>
            </Table>
          </Container>
      </div>
    );
  }

  _onChange() {
    this.setState({
      systemState: SystemStateStore.getCurrentState(),
      configItems: ConfigStore.getAllConfigItems(),
      activityItems: ActivityStore.getAllActivities()
    });
  }

}

export default App;