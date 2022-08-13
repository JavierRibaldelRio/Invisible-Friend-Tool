//Crea un li del paricipante
import React, { Component } from 'react';

class LiParticipante extends Component {
    constructor(props) {
        super(props);
    }

    //Devuelve el li
    render() {
        const participante = this.props.participante;
        const id = 'LiParticipante' + participante;
        return (<li key={participante} id=''>{participante}</li>);
    }
}

export default LiParticipante;