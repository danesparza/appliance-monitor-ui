//  React
import React, { Component } from 'react';

//  Moment
import moment from 'moment';

//  Images
import washimg from '../washing-machine.svg';

class ActivityItem extends Component {  

  render() {
    //  Set the state text and style based on the activity type
    let stateText = "behaved mysteriously";
    let additionalStateInfo = "";
    let stateCSS = "cd-timeline-img ";

    switch(this.props.activity.eventtype)
    {
        case 0:
            stateText = "monitoring system restarted";
            stateCSS += "cd-systemrestart";
            break;
        case 1:
            stateText = "started";
            stateCSS += "cd-started";
            break;
        case 2:
            stateText = "stopped";
            stateCSS += "cd-stopped";
            additionalStateInfo = "It ran for " + this.props.activity.timeElapsedFromPrevious;
            break;
        default:
    }
    
    //  Set the date/time based on the activity timestamp
    let activityTime = moment(this.props.activity.timestamp).calendar(
        null, {sameElse: 'MM/DD/YYYY [at] h:mm A'}
    );    

    return (
        <div className="cd-timeline-block">
            <div className={stateCSS}>
                <img src={washimg} className="App-washing" alt="Washing machine" />
            </div>
            <div className="cd-timeline-content">
                <h2>The dryer {stateText}</h2>
                <p>{additionalStateInfo}</p>
                <span className="cd-date">{activityTime}</span>
            </div> 
        </div>
    );
  }
}

export default ActivityItem;