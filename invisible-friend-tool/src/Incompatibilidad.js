import React, { Component } from 'react';

//Se ocupa de crear cada grupo de checkbox
class Incompatibilidad extends Component {
    constructor(props) {
        super(props);
    }

    restringir() {

        this.props.restringir(this.props.numeroFila, this.props.numeroColumna);
    }


    render() {

        //Almacena la variable de participante
        const participante = this.props.participante

        var deshabilitado = false;


        //Si el número de fila es el mismo que el número de columna
        if (this.props.numeroFila === this.props.numeroColumna) {

            deshabilitado = true;
        }


        return (
            //Devuelve una casilla de verificación con las características introducidas
            <label htmlFor={'label' + this.props.restringido + participante} key={'label' + this.props.restringido + participante}>
                <input type='checkbox' name='tablaIncompatibilidades'
                    checked={this.props.restringido}
                    key={this.props.restringido + 'participante'}
                    onClick={this.restringir.bind(this)}
                    disabled={deshabilitado}
                />
            </label>
        );
    }
}

export default Incompatibilidad;