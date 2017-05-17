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
    //console.log("se definio la projection");
    for(var i=0; i< this.props.tweets.length;i++){
      //console.log(this.props.tweets[i]);
      var nuevaCoordenada = this.projection(this.props.tweets[i].coordinates.coordinates);
      nuevaCoordenada.push(this.props.tweets[i].id);
      nuevaCoordenada.push(this.props.tweets[i].entities.hashtags);
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
        <div className="col-md-12 center"> <h1>Twitter Streamer with # Clustering</h1><h4>Jose Gabriel Tamura</h4><br/> <br/></div>
        <div className="col-md-6"><div >
          <ColombiaMap
            width="700"
            height="700"
            data={{RISARALDA:0}}
            projection={this.setProjection}
          ></ColombiaMap>
          <CanvasSuperiorAMapa  coordenadas={this.coordenadas} ></CanvasSuperiorAMapa>
        </div></div>
        <div className="col-md-6"><div ><input className="col-md-12" type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Para iniciar, presiona Enter aquí!"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <br/>
        <h2>Results:</h2>
        {this.props && this.props.tweets ?
          <TweetsResults tweets={this.props.tweets}/> :
          <p>Presiona Enter para comenzar la busqueda</p>
        }</div></div>


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
