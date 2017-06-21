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
  Button
} from 'reactstrap';

//  Stylesheets
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  Stores
import SystemStateStore from './stores/SystemStateStore'

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      systemState: {
        devicerunning: "unknown"
      }
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
	}

	componentWillUnmount() {
	    //  Remove store listeners
	    this.systemStateListener.remove();
	}

  render() {
    var toast = "Didn't get it";

    if(this.state.systemState.devicerunning === false)
    {
      toast = "GOT IT";
    }

    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Appliance monitor</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/danesparza/appliance-monitor">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Welcome to React {toast}</h1>
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
      systemState: SystemStateStore.getCurrentState()      
    });
  }

}

export default App;