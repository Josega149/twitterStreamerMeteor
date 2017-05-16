import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class CanvasSuperiorAMapa extends Component {
  constructor(props) {
    super(props);
    this.maxId =0;
    this.hashDeHashtags = {};
  }
  componentWillUpdate(nextP){
    console.log(nextP);
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    var listaDeCoordenadas = nextP.coordenadas;
    if(listaDeCoordenadas){
      //console.log('listaDeCoordenadas');
      //console.log(listaDeCoordenadas);
      var mayorLocal = 0;
      for(var i=0; i< listaDeCoordenadas.length ;i++){
        var coordenadasActuales = listaDeCoordenadas[i];
        //console.log('coordenadasActuales');
        //console.log(coordenadasActuales);

        //revisa que solo se añada 1 vez cada tweet. coordenadasActuales[2] es ID
        if(this.maxId < coordenadasActuales[2]){

          var listaDeHashtags = coordenadasActuales[3];
          for(var j=0;j< listaDeHashtags.length;j++){
            var hashtagActual = listaDeHashtags[j];
            this.hashDeHashtags.hashtagActual = [{'x':coordenadasActuales[0], 'y':coordenadasActuales[1]}].push(this.hashDeHashtags.hashtagActual);
          }

          ctx.beginPath();
          ctx.arc(coordenadasActuales[0],coordenadasActuales[1],2,0,2*Math.PI,true);
          ctx.stroke();
          ctx.fillStyle = 'black';
          ctx.fill();

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
