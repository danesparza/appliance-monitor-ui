//  React and reactstrap
import React, { Component } from 'react';
import {
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
import Navbar from './NavBar';

let badgeRunning = <Badge color="success">running</Badge>;
let badgeNotRunning = <Badge>not running</Badge>;

class Main extends Component {  

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,     
    };

    this.tick = this.tick.bind(this);

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  tick() {
    //  Update the displayed time
    this.setState({
      date: moment()
    });
  }

  componentDidMount() {
    //  Add an interval tick for every 30 seconds:
    this.interval = setInterval(this.tick, 30000);
  }

  componentWillUnmount() {
    //  Clear the interval:
    clearInterval(this.interval);
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
        <Navbar {...this.props} />

        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h2>
                  {applianceName} is {runState}<br/>
                  <small className="text-muted">It has been {runStateText} for {timeSinceState}</small>
                </h2>
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