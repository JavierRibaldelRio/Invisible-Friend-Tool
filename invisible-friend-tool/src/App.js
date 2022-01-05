import PreguntarNombres from './PreguntarNombres';

import React, { Component } from 'react';
import FormularioIncompatibilidades from './FormularioIncompatibilidades';


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


      copia[0].push(a);

      copia.push([a]);

      // copia.map((x) => {
      //   x.push(false)
      // })

      copia[copia.length - 1][copia.length - 1] = true;

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

      console.table(copia);
      this.setState({ participantes: this.state.participantes.concat(a), tablaDeIncompatibilidad: [...copia] }); //Anyade al estado la nueva persona

    }
    else {
      alert('Este nombre ya esta en uso, por favor, introduzca uno diferente')
    }


  }

  render() {

    return (
      <div className="App">
        <PreguntarNombres anyadir={this.anyadirParticipante.bind(this)} participantes={this.state.participantes} />

        <FormularioIncompatibilidades participantes={this.state.participantes} />
      </div>
    );

  }
}

export default App;
