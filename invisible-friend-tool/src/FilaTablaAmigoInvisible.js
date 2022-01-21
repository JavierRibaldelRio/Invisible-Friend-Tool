import React, { Component } from 'react';


class FilaTablaAmigoInvisible extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false  //Si es visible el resultado
        }
    }

    invertir() {

        this.setState({ visible: !this.state.visible });

    }

    render() {


        let textoBoton = this.state.visible ? "Ocultar" : 'Mostrar';   //Si visible es true  lo muestra o lo oculta

        let clasesPersonaARegalar = this.state.visible ? 'nombreMostrado' : 'nombreOculto';    //Que clase tiene que tener

        return (<tr>


            <th>{this.props.participante.nombre}</th>
            <th className={clasesPersonaARegalar}>{this.props.participante.personaARegalar}</th>

            <th>
                <button onClick={this.invertir.bind(this)}>{textoBoton}</button>

            </th>

        </tr>);
    }
}

export default FilaTablaAmigoInvisible;