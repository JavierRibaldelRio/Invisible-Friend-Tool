import React, { Component } from 'react';
import formatName from '../scripts/FormatearNombre';
import ListaParticipantes from './ListaParticipantes';

import { useNavigate } from 'react-router-dom';
import BotonContinuar from './BotonContinuar';

const idForm = 'form-insertar-nombre';      //Almacena la ide del formulario

class PreguntarNombres extends Component {
    constructor(props) {
        super(props);

        this.state = { participantes: [] };

        //Funciones

        this.validar = this.validar.bind(this);

        this.eliminar = this.eliminar.bind(this);

        this.pasarATabla = this.pasarATabla.bind(this);

        //Referencias 
        this.nombreInput = new React.createRef();
    }

    //Asigna un nuevo nombre
    validar(e) {

        //Evita que el formulario se refresque
        e.preventDefault();

        //Almacena el participante, tal y como ha sido introducido en la casilla de verificación
        let participante = this.nombreInput.current.value;

        //Formatea el nombre
        participante = formatName(participante);

        //Resetea el formulario
        document.getElementById(idForm).reset();

        //Añade al array de participantes

        //Si ya esta incluido impide añadirlo
        if (!this.state.participantes.includes(participante)) {
            this.setState({ participantes: [...this.state.participantes, participante] });
        }
        else {

            alert("Este participante ya existe.")
        }

    }

    //Elimina el participante
    eliminar(participante) {

        //Almacena todo los participantes
        let participantes = this.state.participantes;

        //Almacena el indice del participante a eliminar
        const indexParticipante = participantes.indexOf(participante);

        //Elimina el participante
        participantes.splice(indexParticipante, 1);

        this.setState({ participantes: participantes });

    }

    //Pasa a tabla
    pasarATabla() {

        //Coge Navigate
        const { navigate } = this.props;

        //Añade a navigate los participantes actuales
        navigate('/incompatibility-table', { state: this.state.participantes });
    }

    render() {
        return (

            <div className='PreguntarNombres' >

                <form id={idForm} onSubmit={this.validar}>

                    <label htmlFor="persona" id="persona-label">
                        Inserte el nombre de cada participante y después presione "Añadir participante":<br>
                        </br>
                        <input type="text" id="persona" placeholder="Pedro" ref={this.nombreInput} required />
                    </label>

                    <br />

                    <input type='submit' value='Añadir Participante'></input>

                </form>

                <h2>Participantes Añadidos</h2>

                <ListaParticipantes participantes={this.state.participantes} eliminar={this.eliminar} />

                <BotonContinuar texto="Siguiente" handleClick={this.pasarATabla} />



            </div>);
    }
}
//Envolvemos el componente de clase en un componente de función para poder usar navigate
export default function (props) {
    const navigate = useNavigate();

    return (<PreguntarNombres {...props} navigate={navigate} />);
}