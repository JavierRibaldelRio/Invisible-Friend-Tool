import PreguntarNombres from './PreguntarNombres';

import React, { Component } from 'react';
import TablaIncompatibilidades from './TablaIncompatibilidades';
import Participante from './ClaseParticipante';
import shuffle from './Barajar';
import TablaAmigoInvisible from './TablaAmigoInvisble';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {

      participantes: [],                //alamcena todos los participantes en el amigo invisible
      tablaDeIncompatibilidad: [['x']],      //Es la tabla de la incompatibilidad
      bloqueadoGeneral: false,               //Indica si todavia se permiten añadir amigos
      objetosParticipantes: []                //Almacena los objetos de los participantes
    }
  }

  //Añade al arrayy de participantes el nuevo participante
  anyadirParticipante(a) {

    if (this.state.participantes.includes(a) === false) {

      //Copia de tabla de compatibilidad

      var copia = [...this.state.tablaDeIncompatibilidad];

      //Le anñade la a al matriz cero
      copia[0].push(a);

      //Le añade una nueva fila al array
      copia.push([a]);

      //LLena todos los huecos en blanco en la posición de de false y se asegura de que los que sean true por obligación,sehan true
      for (var i = 1; i < copia.length; i++) {

        for (var j = 1; j < copia[0].length; j++) {

          if (j === i || copia[i][j] === true) {

            copia[i][j] = true;

          }

          else {

            copia[i][j] = false;
          }

        }
      }
      this.setState({ participantes: this.state.participantes.concat(a), tablaDeIncompatibilidad: [...copia] }); //Anyade al estado la nueva persona

    }
    else {
      alert('Este nombre ya esta en uso, por favor, introduzca uno diferente')
    }


  }

  //Se ocupa de reiniciar la tabla (ponerlo casi todo a false)

  reiniciarTabla() {

    var copia = [...this.state.tablaDeIncompatibilidad]

    for (var i = 1; i < copia.length; i++) {

      for (var j = 1; j < copia[0].length; j++) {

        if (j === i) {

          copia[i][j] = true;

        }

        else {

          copia[i][j] = false;
        }

      }
    }

    this.setState({ tablaDeIncompatibilidad: copia });    //Guarda los camibios añadiondeolos al estado

  }

  //Se ocupa de cambiar las casillas correspondientes a su nuevo valor
  restringir(fila, columna) {

    let copia = [...this.state.tablaDeIncompatibilidad];  //Hace una copia del array

    copia[fila][columna] = !copia[fila][columna];       //Invierte la casilla

    copia[columna][fila] = !copia[columna][fila];     //Invierte la casilla que es la misma que la anterior

    this.setState({ tablaDeIncompatibilidad: copia });    //Guarda los camibios añadiondeolos al estado

  }


  //Hace el amigo invisible

  amigoInvisible() {

    this.setState({ bloqueadoGeneral: true });    //Evita que se puedan seguir añadiendo persona o cambiado restriciones

    const tabla = [...this.state.tablaDeIncompatibilidad];    //Almacena la tabla 

    var arrObjetos = [];    //Crea una array que almacena todos los objetos

    //LLena el array de incompatibilidades de cada objeto
    for (var i = 1; i < tabla.length; i++) {

      var arrayRestringidos = [];

      for (var j = 1; j < tabla[0].length; j++) {

        if (tabla[i][j] === true) {

          arrayRestringidos.push(tabla[0][j]);

        }
      }
      arrObjetos.push(new Participante(tabla[i][0], arrayRestringidos))

    }

    var contador = 0;       //Contador que almacena en número de iteraciones que ha tenido el bucle

    var repetir = true;     //Comprueba si el bucle se tiene que repetir

    //Para que se repita 100 veces
    while (contador < 1000 && repetir === true) {
      repetir = false;  //Dice que ya no hay que repetir
      var copiaABarajar = [...this.state.participantes];  //Crea una copia que va a brajar

      shuffle(copiaABarajar);   //BAraja

      //Se ejecuta una vez por cada objeto
      arrObjetos.map((x) => {


        //Elimina todo lo que haya sido guardadro
        x.borrar();

        //Si no se puede añadir haz que el bucle se vuelva a repetir
        if (x.setPersonaARegalar(copiaABarajar.shift()) === false) {

          repetir = true; //Se repite

        }

        //Le suma uno al contador
        contador++;
      });

    }

    //Si no ha salido nininguan combinación posible
    if (repetir === true) {

      //Avisa de que no hay combinaciones posibles
      alert('No existe una combinación posible que cumpla todas las restricciones.');

      this.setState({ bloqueadoGeneral: false });
    }
    else {

    }
    this.setState({ objetosParticipantes: arrObjetos });

  }

  render() {

    return (
      <div className="App">
        <PreguntarNombres
          anyadir={this.anyadirParticipante.bind(this)}          //Funciónque añade un nuevo participante al amigo invisible
          participantes={this.state.participantes}               //Array que conteine a todos los participantes
          bloqueadoGeneral={this.state.bloqueadoGeneral}         //Si se pueden añadir o no personas
        />

        <TablaIncompatibilidades

          tabla={this.state.tablaDeIncompatibilidad}            //La tabla de compativilidad
          bloqueadoGeneral={this.state.bloqueadoGeneral}        //Indiaca si todavia se pueden o no su puede añadir compañeros
          participantes={this.state.participantes}              //Todos los participantes, para crear las cabeceras

          restringir={this.restringir.bind(this)}               //La función que hay para restringir alguna pareja
          reiniciar={this.reiniciarTabla.bind(this)}            //Manda la funciónd e reinicair la tabla
          amigoInvisible={this.amigoInvisible.bind(this)}       //Le manda la función que hace el amigo invisible

        />

        <TablaAmigoInvisible participantes={this.state.objetosParticipantes}></TablaAmigoInvisible>
      </div>
    );

  }
}

export default App;
