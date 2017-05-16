import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class CanvasSuperiorAMapa extends Component {
  constructor(props) {
    super(props);
    this.maxId =0;
  }
  componentWillUpdate(nextP){
    console.log(nextP);
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    var listaDeCoordenadas = nextP.coordenadas;
    if(listaDeCoordenadas){
      console.log('listaDeCoordenadas');
      console.log(listaDeCoordenadas);
      var mayorLocal = 0;
      for(var i=0; i< listaDeCoordenadas.length ;i++){
        var coordenadasActuales = listaDeCoordenadas[i];
        console.log('coordenadasActuales');
        console.log(coordenadasActuales);

        if(this.maxId < coordenadasActuales[2]){
          ctx.beginPath();
          ctx.arc(coordenadasActuales[0],coordenadasActuales[1],3,0,2*Math.PI,true);
          ctx.stroke();

          if(coordenadasActuales[2] > mayorLocal){
            mayorLocal = coordenadasActuales[2];
          }
        }
      }
      if(mayorLocal > this.maxId){
        this.maxId = mayorLocal;
      }
    }

  }
  render() {
    return (
      <div className="canvas"  >
        <canvas id="myCanvas" ref='canvas' width="700" height="700"></canvas>
      </div>
    );
  }
}
