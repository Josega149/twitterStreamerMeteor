import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";
import ColombiaMap from "./ColombiaMap.jsx";
import canvasSuperiorAMapa from "./canvasSuperiorAMapa.jsx";

export class App extends Component {

  constructor(props) {
    super(props);

    this.projection;
    this.setProjection = this.setProjection.bind(this);
  }

  setProjection(pr){
    this.projection = pr;
    console.log("se definio la projection");
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }


  render() {
    console.log("render!");
    //const tweets = this.props.tweets;

    return (
      <div>
        <div className="col-md-6">
          <canvasSuperiorAMapa></canvasSuperiorAMapa>
          <ColombiaMap
            width="600"
            height="600"
            data={{RISARALDA:10, CALDAS:12}}
            projection={this.setProjection}
          ></ColombiaMap>
        </div>
        <div className="col-md-6"><input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Results:</h2>
        {this.props && this.props.tweets ?
          <TweetsResults tweets={this.props.tweets}/> :
          <p>Enter a query</p>
        }</div>


      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);
