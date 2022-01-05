import React, { Component } from 'react';
import FilaTabla from './FilaTablaIncompatibilidad';
import Incompatibilidad from './Incompatibilidad';


class TablaIncompatibilidades extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {



        var filas = []; //Alamcena todas las fila ha añadir


        for (var i = 1; i < this.props.tabla.length; i++) {


            filas.push(<FilaTabla key={this.props.tabla[i][0] + 'fila'}
                numeroFila={i} fila={this.props.tabla[i]} restringir={this.props.restringir.bind(this)}></FilaTabla >)

        }

        return (
            <table id='tablaIncompatibilidades' >
                <tbody>

                    <tr>
                        {/*La primera casilla se queda vacia*/}
                        <th>x</th>

                        {this.props.participantes.map((x) => {


                            return <th key={x + 'thho'} className='ThNombres'>{x}</th>

                        })
                        }
                    </tr>


                    {filas.map((x) => {

                        return x;

                    })}



                </tbody>
            </table>
        );
    }
}

export default TablaIncompatibilidades;