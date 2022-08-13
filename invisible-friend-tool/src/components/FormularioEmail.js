import React, { Component } from 'react';

import { asunto } from '../scripts/Variables';

//Devuelve un formulario para enviar el correo con todos los participantes
class FormularioEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: 'Hola,**DESTINATARIO**:\n\nPara el amigo de invisble de: <nombre del amigo invisible>, tienes que hacerle un regalo a **REGALADO**.\n\nGracias, para más dudas mandelas a este correo: <sucorreo@correo.su>\n\n',
            asunto: ''
        }
    }

    render() {
        return (<div>

            <h2>Enviar por Correo</h2>

            <p>Esta sección sirve para enviar un correo electrónico a todos los participantes indicando a quien les tienen que hacer el regalo</p>

            <p>Asunto:</p>

            <input placeholder={asunto} onChange={(e) => { this.setState({ asunto: e.target.value }) }}></input>

            <p>Inserte el cuerpo del correo:</p>

            <textarea onChange={(e) => { this.setState({ texto: e.target.value }) }} value={this.state.texto} />


            <p>

                <strong>**DESTINATARIO**</strong>: a la hora de enviar el correo a cada participante será sustituido por el nombre del destinatario.<br></br>


                <strong>**REGALADO**</strong>: será sustituido por el nombre de la persona a la que le teine que regalar


                <br></br><br>
                </br>

                Por favor asegurese de que ha introducido de forma correcta todos los correos,
            </p>




            <input type='submit' value="Enviar" onClick={() => { this.props.enviarAlServidor(this.state.texto, this.state.asunto) }} />

        </div >);
    }
}

export default FormularioEmail;