import React, { Component } from 'react';

//Devuelve una fila de la tabla del amigo invisible
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

        let correo;
        //Si se envia por correo
        if (this.props.enviar === true) {

            correo = <td><input type='email' onChange={(e) => { this.props.definirCorreo(this.props.participante.nombre, e.target.value) }}></input></td>

        }
        return (<tr>


            <td>{this.props.participante.nombre}</td>
            <td className={clasesPersonaARegalar}>{this.props.participante.personaARegalar}</td>

            <td>
                <button onClick={this.invertir.bind(this)}>{textoBoton}</button>

            </td>

            {correo}

        </tr>);
    }
}

export default FilaTablaAmigoInvisible;