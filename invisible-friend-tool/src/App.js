import PreguntarNombres from './PreguntarNombres';

import React, { Component } from 'react';
import TablaIncompatibilidades from './TablaIncompatibilidades';
import reiniciar from './ReiniciarTabla';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {

      participantes: [],  //alamcena todos los participantes en el amigo invisible
      tablaDeIncompatibilidad: [['x']] //Es la tabla de la incompatibilidad
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

  render() {

    return (
      <div className="App">
        <PreguntarNombres anyadir={this.anyadirParticipante.bind(this)} participantes={this.state.participantes} />

        <TablaIncompatibilidades

          tabla={this.state.tablaDeIncompatibilidad}  //La tabla de compativilidad

          participantes={this.state.participantes}    //Todos los participantes, para crear las cabeceras

          restringir={this.restringir.bind(this)}     //La función que hay para restringir alguna pareja
          reiniciar={this.reiniciarTabla.bind(this)}  //Manda la funciónd e reinicair la tabla


        />
      </div>
    );

  }
}

export default App;
