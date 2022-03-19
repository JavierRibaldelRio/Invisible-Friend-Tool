import React, { Component } from 'react';
import { primeraMayuscula } from '../scripts/FuncionesUtiles';
import ListaParticipantes from './ListaParticipantes';


class PreguntarNombres extends Component {
    constructor(props) {
        super(props);


        this.nombreInput = new React.createRef();
    }


    validar(e) {

        //Evita que el formulario se refresque
        e.preventDefault();

        //Almacena el participante, tal y como ha sido introducido en la casilla de verificación
        let participante = this.nombreInput.current.value;

        document.getElementById("ins_pe").reset();


        participante = participante.trim().toLowerCase();   //Le quita los espacios y lo pasa a minúsculas


        participante = primeraMayuscula(participante);


        //Añade al array de participantes
        this.props.anyadir(participante)

    }
    render() {
        return (

            <div className='PreguntarNombres' >

                <form id="ins_pe" onSubmit={this.validar.bind(this)}>

                    <label htmlFor="persona" id="persona-label">
                        Inserte el nombre de cada participante y después presione "Añadir participante":<br>
                        </br>
                        <input type="text" id="persona" placeholder="Pedro" ref={this.nombreInput} disabled={this.props.bloqueadoGeneral} required />
                    </label>

                    <br />

                    <input type='submit' value='Añadir Participante' disabled={this.props.bloqueadoGeneral}></input>

                </form>

                <h2>Participantes Añadidos</h2>

                <ListaParticipantes participantes={this.props.participantes}></ListaParticipantes>



            </div>);
    }
}

export default PreguntarNombres;