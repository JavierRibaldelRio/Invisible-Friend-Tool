import React, { Component } from 'react';
import FilaTabla from './FilaTablaIncompatibilidad';
import Incompatibilidad from './Incompatibilidad';


class TablaIncompatibilidades extends Component {
    constructor(props) {
        super(props);

        this.refEnviar = new React.createRef();        //Referencia del boton
    }


    generarAmigoInvisbleYPasarEnviar() {

        console.log(this.refEnviar.current.checked)

        this.props.amigoInvisible(this.refEnviar.current.checked);

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
                bloqueadoGeneral={this.props.bloqueadoGeneral}  //Le manda si esta bloqueado todo
            />);

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

                <div>

                    Desea enviar por correo el resultado del reparto: <br />

                    <input id='siDeseoEnviarlo' type='radio' name="enviar" ref={this.refEnviar} value={true} disabled={this.props.bloqueadoGeneral} />Sí
                    <input id='siDeseoEnviarlo' type='radio' name="enviar" value={false} disabled={this.props.bloqueadoGeneral} />No
                </div>

                <button onClick={this.props.reiniciar.bind(this)} disabled={this.props.bloqueadoGeneral}>Reiniciar</button>

                <button onClick={this.generarAmigoInvisbleYPasarEnviar.bind(this)}>Generar Amigo invisible</button>


            </div>


        );
    }
}

export default TablaIncompatibilidades;