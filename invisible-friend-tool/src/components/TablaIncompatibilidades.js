import React, { Component } from 'react';
import FilaTabla from './FilaTablaIncompatibilidad';
import { useLocation } from 'react-router-dom';

import rellenarTabla from '../scripts/RellenarTabla'

//Crea la tabla par air marcando las incompativilidades

class TablaIncompatibilidades extends Component {
    constructor(props) {
        super(props);

        this.state = { tabla: [] };

        this.reiniciar = this.reiniciar.bind(this);
        this.restringir = this.restringir.bind(this);

        this.refEnviar = new React.createRef();        //Referencia del boton
    }


    //Se ejecuta al montar el componente
    componentDidMount() {

        //Crea el contenido de la tabla

        //Coge los participantes
        var participantes = this.props.location.state;

        console.log("Participantes: " + participantes);

        //Creamos la tabla con la primera columna con una equis y los participnates
        var tabla = [[null, ...participantes]]

        //Añade todas las cabeceras de fila
        participantes.map((x) => {
            tabla.push([x]);
        })

        rellenarTabla(tabla);

        this.setState({ tabla: [...tabla] });

    }

    //Pone la tabla en configuración original
    reiniciar() {

        var copia = this.state.tabla;

        rellenarTabla(copia)

        this.setState({ tabla: copia });
    }

    //Hace que cuando se marque una casilla se marque la contraria
    restringir(fila, columna) {

        let copia = [...this.state.tabla];  //Hace una copia del array

        copia[fila][columna] = !copia[fila][columna];       //Invierte la casilla

        copia[columna][fila] = !copia[columna][fila];     //Invierte la casilla que es la misma que la anterior

        this.setState({ tabla: copia });    //Guarda los camibios añadiondeolos al estado

    }

    generarAmigoInvisbleYPasarEnviar() {

        this.props.amigoInvisible(this.refEnviar.current.checked);

    }



    render() {


        var filas = []; //Alamcena todas las fila ha añadir

        //Añade las filas al array que almacena las filas
        for (var i = 1; i < this.state.tabla.length; i++) {

            filas.push(<FilaTabla
                key={this.state.tabla[i][0] + 'fila'}           //Necesario para react
                fila={this.state.tabla[i]}                      //El contenido de la fila, [(nombre), true,false...]
                numeroFila={i}                                  //almacena el número de la fila en la matriz global
                restringir={this.restringir}                    //Le pasa la función que restringe
            />);

        }

        return (
            <div>
                <table id='tablaIncompatibilidades' >
                    <tbody>
                        <tr>
                            {/*La primera casilla se queda vacia*/}
                            <th>x</th>

                            {this.props.location.state.map((x) => {


                                return <th key={x + 'thho'} className='ThNombres'>{x}</th>

                            })
                            }
                        </tr>


                        {filas}



                    </tbody>
                </table>

                <div>

                    Desea enviar por correo el resultado del reparto: <br />

                    <input id='siDeseoEnviarlo' type='radio' name="enviar" ref={this.refEnviar} value={true} />Sí
                    <input id='siDeseoEnviarlo' type='radio' name="enviar" value={false} />No
                </div>

                <button onClick={this.reiniciar}>Reiniciar tabla</button>

                <button onClick={this.generarAmigoInvisbleYPasarEnviar.bind(this)}>Generar Amigo invisible</button>


            </div>


        );
    }
}

//Creamos el hook que nos poermite usar location
export default function (props) {

    const location = useLocation();

    return <TablaIncompatibilidades {...props} location={location} />

};