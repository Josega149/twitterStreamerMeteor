import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class CanvasSuperiorAMapa extends Component {
  constructor(props) {
    super(props);
    this.maxId =0;
    this.hashDeHashtags = {};
  }
  componentWillUpdate(nextP){
    //console.log(nextP);
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
            var hashtagActual = listaDeHashtags[j].text;
            if(this.hashDeHashtags[hashtagActual]){
                this.hashDeHashtags[hashtagActual] = this.hashDeHashtags[hashtagActual].concat({'x':coordenadasActuales[0], 'y':coordenadasActuales[1]});
            }
            else{
              this.hashDeHashtags[hashtagActual] = [{'x':coordenadasActuales[0], 'y':coordenadasActuales[1]}];
            }

            console.log("el hashtag: ");
            console.log(hashtagActual);
            console.log("Tiene la siguiente lista de coordenadas: ");
            console.log(this.hashDeHashtags[hashtagActual]);
          }
          if(listaDeHashtags.length === 0){
            ctx.beginPath();
            ctx.arc(coordenadasActuales[0],coordenadasActuales[1],2,0,2*Math.PI,true);
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.fill();
          }

          if(coordenadasActuales[2] > mayorLocal){
            mayorLocal = coordenadasActuales[2];
          }
        }
      }
      if(mayorLocal > this.maxId){
        this.maxId = mayorLocal;
      }
    }
    this.dibujarClusterHash();
  }
  dibujarClusterHash(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    //por cada atributo en hashDeHashtags (o sea cada hashtag que han creado)
    //va a crear un cluster con todos los tweets que lo mencionaron
    console.log("va a pintar todos los hashtags");
    for (var property in this.hashDeHashtags) {
        if (this.hashDeHashtags.hasOwnProperty(property)) {
          ctx.beginPath();
          console.log("property  ");
          console.log(property);
          //property es una lista con los x y

          let b = Math.floor(Math.random()*150);
          let g = Math.floor(Math.random()*150);
          let r = Math.floor(Math.random()*150);
          for(var i=0; i< this.hashDeHashtags[property].length;i++){

            var coordenadasActuales = this.hashDeHashtags[property][i];
            ctx.arc(coordenadasActuales.x,coordenadasActuales.y,2,0,2*Math.PI,true);
            ctx.strokeStyle = 'rgba('+r+","+g+","+b+',255)';
            ctx.stroke();
          }
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
