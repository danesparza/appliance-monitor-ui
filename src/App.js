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
  Badge
} from 'reactstrap';

//  Stylesheets
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  Stores
import SystemStateStore from './stores/SystemStateStore'
import ActivityStore from './stores/ActivityStore'
import ConfigStore from './stores/ConfigStore'

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      systemState: {
        appversion: "unknown"
      },
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
    
    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Appliance monitor <small>v{this.state.systemState.appversion}</small></NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Settings</NavLink>
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
                <h2>The Dryer is <Badge>not running</Badge></h2>
                <p>
                  <Button tag="a" color="success" size="large" href="http://reactstrap.github.io" target="_blank">
                    View Reactstrap Docs
                  </Button>
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
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