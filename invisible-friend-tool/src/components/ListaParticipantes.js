import React, { Component } from 'react';
import LiParticipante from './LiParticipante';

class ListaParticipantes extends Component {
    constructor(props) {
        super(props);
    }
    render() {



        return (<ul id='listaParticipantes'>

            {
                this.props.participantes.map((x) =>
                    <LiParticipante key={x} participante={x} />
                )
            }

        </ul>);
    }
}

export default ListaParticipantes;