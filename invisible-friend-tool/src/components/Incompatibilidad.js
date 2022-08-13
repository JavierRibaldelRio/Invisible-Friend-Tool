import React, { Component } from 'react';

//Se ocupa de crear cada grupo de checkbox
class Incompatibilidad extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        //Almacena la variable de participante
        const regalador = this.props.regalador

        return (
            //Devuelve una casilla de verificación con las características introducidas
            <label htmlFor={'label' + regalador} key={'label' + regalador}>
                <input type='checkbox' name='tablaIncompatibilidades'
                    checked={this.props.valor}                                      //Indica si esta o no esta marcada la check box
                    key={this.props.restringido + regalador + 'participante'}       //Key crea una clave única para cada elemento
                    onChange={this.props.restringirCompleta.bind(this)}             //En el cambio ejecuta la función de cabio  
                    disabled={this.props.bloqueado}                                 //En caso de que se especifique bloquea la casilla
                />
            </label>
        );
    }
}

export default Incompatibilidad;