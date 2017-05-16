import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class CanvasSuperiorAMapa extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.updateCanvas();
  }
  updateCanvas(){
    const ctx = this.refs.canvas.getContext('2d');
    ctx.arc(100,75,2,0,2*Math.PI);
    ctx.fill();
  }
  render() {
    var coordenadas = this.props.coordenadas;//lista de listas
    return (
      <div className="canvas">
        <canvas id="myCanvas" ref='canvas' width="600" height="600"></canvas>
      </div>
    );
  }
}
