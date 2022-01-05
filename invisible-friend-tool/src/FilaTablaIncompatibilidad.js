import React, { Component } from 'react';
import Incompatibilidad from './Incompatibilidad';

//Devuelve una fila llena de incompatibilidades(checkbox)
class FilaTabla extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const fila = this.props.fila;       //Almacena las filas

        var celdasNormales = [];    //Almacena cada una de las celdas normales

        //Se ejecuta una vez por cada boolean en el array,añade las casillas de verificación a las zeldas y esta al array
        for (let i = 1; i < fila.length; i++) {

            celdasNormales.push(
                <td key={'td' + fila[0] + i}/*Crea una clave con la i para celdas*/>

                    <Incompatibilidad

                        regalador={fila[0]}                                             //Indica la persona que regala                          
                        valor={fila[i]}                                                 //Indica el valor que tiene la celda               
                        key={'incompativilidad' + fila[0] + i}                          //Crea una clave para el dom random
                        bloqueado={(this.props.numeroFila === i || this.props.bloqueadoGeneral)}                       //Devuelve si esta bloqueada esa verificación
                        //Crea una función que manda a función restringir l a columna y la fila
                        restringirCompleta={(() => { this.props.restringir(this.props.numeroFila, i) }).bind(this)}

                    />

                </td>)



        }

        //Devuelveun tr con una calbe aleatorio
        return (

            <tr key={'tr' + fila[0]}>

                {/*Pone en la primera celd ael nombre del regalador*/}
                <th key={'thve' + fila[0]}>{fila[0]}</th>

                {
                    //Carga todas las celdas con check box
                    celdasNormales.map((x) => {

                        return x;
                    })

                }

            </tr>);
    }
}

export default FilaTabla;