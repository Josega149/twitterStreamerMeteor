import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import manejadorCanvas from "./manejadorCanvas.js";


export default class CanvasSuperiorAMapa extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var projection = this.props.projection;
    return (
      <div className="canvas">
        <canvas id="myCanvas" width="600" height="600"></canvas>
      </div>
    );
  }
}
