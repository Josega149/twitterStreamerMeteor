# TwitterStreamerMeteor con Geo localización y clustering de Tweets

Este es un proyecto hecho en Meteor-React que permite visualizar geograficamente y en tiempo real los Tweets hechos en Colombia (y sus alrededores).  Utiliza el modulo de Twitter [npm](https://www.npmjs.com/package/twitter) para conectarse al Streaming de datos. Adicionalmente, une todos los Tweets que hayan compartido el mismo hashtag, para visualizar geograficamente los temas comunes de los que habla la gente en Colombia (y sus alrededores). Los temas comunes son unidos por hilos de igual color.Al final indica el hashtag más usado por los usuarios.

![1 image](http://i.imgur.com/V7ZiQZ6.jpg)

# Para correr el proyecto:
```
* export TWITTER_CONSUMER_KEY="yourCredentialsHere"
* export TWITTER_CONSUMER_SECRET="yourCredentialsHere"
* export TWITTER_ACCESS_TOKEN_KEY="yourCredentialsHere"
* export TWITTER_ACCESS_TOKEN_SECRET="yourCredentialsHere"

* meteor npm install
* meteor
```
# Descripción de la SALSA secreta:
Una de las principales funcionalidades de Twitter es poder mencionar colectivamente un tema de interés común mediante hashtags (y volver el tema "Trending"). La idea del proyecto es poder visualizar quienes (y en que regiones de Colombia) están hablando de los mismos temas y observar patrones de comportamiento asociados a usar un mismo hashtag. ¿Se trata de un tema nacional? ¿Se esta hablando del tema en otros países? ¿En que región de Colombia se esta hablando más de un tema? Con esta funcionalidad es fácil identificar esto y más! (Los Tweets que contienen hashtags se dibujan sin relleno en el mapa).
![1 image](http://i.imgur.com/hvn3D7N.jpg)
