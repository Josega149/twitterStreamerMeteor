import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";
import ColombiaMap from "./ColombiaMap.jsx";
import CanvasSuperiorAMapa from "./CanvasSuperiorAMapa.jsx";

export class App extends Component {

  constructor(props) {
    super(props);

    this.projection;
    this.coordenadas = [];
    this.setProjection = this.setProjection.bind(this);
  }

  setProjection(pr){
    this.coordenadas = [];
    this.projection = pr;
    var max =0;
    console.log("se definio la projection");
    for(var i=0; i< this.props.tweets.length;i++){
      var nuevaCoordenada = this.projection(this.props.tweets[i].coordinates.coordinates);
      nuevaCoordenada.push(this.props.tweets[i].id);
      this.coordenadas.push(nuevaCoordenada);
    }
    //console.log("todas las coordenadas");
    //console.log(this.coordenadas);
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
        <div >
          <ColombiaMap
            width="600"
            height="600"
            data={{RISARALDA:0}}
            projection={this.setProjection}
          ></ColombiaMap>
          <CanvasSuperiorAMapa  coordenadas={this.coordenadas} ></CanvasSuperiorAMapa>
        </div>
        <div ><input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
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
