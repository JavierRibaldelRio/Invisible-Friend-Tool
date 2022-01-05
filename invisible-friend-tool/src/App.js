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
      reiniciar(copia);

      console.table(copia);
      this.setState({ participantes: this.state.participantes.concat(a), tablaDeIncompatibilidad: [...copia] }); //Anyade al estado la nueva persona

    }
    else {
      alert('Este nombre ya esta en uso, por favor, introduzca uno diferente')
    }


  }

  //Se ocupa de cambiar las casillas correspondientes a su nuevo valor
  restringir(fila, columna) {

    let copia = [...this.state.tablaDeIncompatibilidad];

    copia[fila][columna] = !copia[fila][columna]

    copia[columna][fila] = !copia[columna][fila]

    this.setState({ tablaDeIncompatibilidad: copia })

  }

  render() {

    return (
      <div className="App">
        <PreguntarNombres anyadir={this.anyadirParticipante.bind(this)} participantes={this.state.participantes} />

        <TablaIncompatibilidades tabla={this.state.tablaDeIncompatibilidad} participantes={this.state.participantes} restringir={this.restringir.bind(this)} />
      </div>
    );

  }
}

export default App;
