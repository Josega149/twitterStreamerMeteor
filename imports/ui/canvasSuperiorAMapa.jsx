import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class CanvasSuperiorAMapa extends Component {
  constructor(props) {
    super(props);
  }
  componentWillUpdate(nextP){
    console.log(nextP);
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    var listaDeCoordenadas = nextP.coordenadas;
    if(listaDeCoordenadas){
      console.log('listaDeCoordenadas');
      console.log(listaDeCoordenadas);
      for(var i=0; i< listaDeCoordenadas.length ;i++){
        var coordenadasActuales = listaDeCoordenadas[i];
        console.log('coordenadasActuales');
        console.log(coordenadasActuales);
        ctx.beginPath();
        ctx.arc(coordenadasActuales[0],coordenadasActuales[1],3,0,2*Math.PI,true);
        ctx.stroke();
      }
    }

  }
  render() {
    return (
      <div className="canvas"  >
        <canvas id="myCanvas" ref='canvas' width="600" height="600"></canvas>
      </div>
    );
  }
}
