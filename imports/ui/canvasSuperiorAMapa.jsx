import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import manejadorCanvas from "./manejadorCanvas.js";


export default class canvasSuperiorAMapa extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    console.log("eroiajfajfaisjfañ");
    return (
      <div className="canvas">
        <canvas id="myCanvas" width="200" height="200" style="border:1px solid #000000;"></canvas>
      </div>
    );
  }
}
