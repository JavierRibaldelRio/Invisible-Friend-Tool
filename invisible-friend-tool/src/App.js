import PreguntarNombres from './PreguntarNombres';

import React, { Component } from 'react';
import FormularioIncompatibilidades from './FormularioIncompatibilidades';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {

      participantes: [],  //alamcena todos los participantes en el amigo invisible
    }
  }

  //Añade al arrayy de participantes el nuevo participante
  anyadirParticipante(a) {

    if (this.state.participantes.includes(a) === false) {

      this.setState({ participantes: this.state.participantes.concat(a) }); //Anyade al estado la nueva persona

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
