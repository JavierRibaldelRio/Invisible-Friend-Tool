import React, { Component } from 'react';
import FilaTabla from './FilaTablaIncompatibilidad';
import Incompatibilidad from './Incompatibilidad';


class TablaIncompatibilidades extends Component {
    constructor(props) {
        super(props);
    }

    generarAmigoInvisible() {

    }


    render() {



        var filas = []; //Alamcena todas las fila ha añadir

        //Añade las filas al array que almacena las filas
        for (var i = 1; i < this.props.tabla.length; i++) {

            filas.push(<FilaTabla
                key={this.props.tabla[i][0] + 'fila'}           //Necesario para react
                fila={this.props.tabla[i]}                      //El contenido de la fila, [(nombre), true,false...]
                numeroFila={i}                                  //almacena el número de la fila en la matriz global
                restringir={this.props.restringir.bind(this)}   //Le pasa la función 
            ></FilaTabla>)

        }

        return (
            <div>
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

                <button onClick={this.props.reiniciar.bind(this)}>Reiniciar</button>



            </div>


        );
    }
}

export default TablaIncompatibilidades;