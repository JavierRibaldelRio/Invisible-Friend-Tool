import React, { Component } from 'react';
import Incompatibilidad from './Incompatibilidad';

//Devuelve una fila de la columna de checkbox
class FilaTabla extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const fila = this.props.fila;       //Almacena las filas

        var celdasNormales = [];    //Almacena cada una de las celdas normales


        for (let i = 1; i < fila.length; i++) {

            celdasNormales.push(<td key={'td' + fila[0] + fila[i] + Math.random()}>

                <Incompatibilidad participante={fila[0]} restringido={fila[i]}
                    key={'incompativilidad' + fila[0] + fila[i] + Math.random()}

                    numeroFila={this.props.numeroFila} numeroColumna={i}

                    restringir={this.props.restringir.bind(this)}

                />

            </td>)



        }

        return (<tr key={'tr' + fila[0]}>

            <th key={'thve' + fila[0]}>{fila[0]}</th>


            {

                celdasNormales.map((x) => {

                    return x;
                })

            }

        </tr>);
    }
}

export default FilaTabla;