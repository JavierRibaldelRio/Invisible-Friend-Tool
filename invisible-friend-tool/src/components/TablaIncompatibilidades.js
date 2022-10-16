import React, { Component } from 'react';
import FilaTabla from './FilaTablaIncompatibilidad';
import { useLocation, useNavigate } from 'react-router-dom';
import rellenarTabla from '../scripts/RellenarTabla';
import Participante from '../class/ClaseParticipante';
import shuffle from '../scripts/Barajar';
import repeticiones from '../data/repeticiones';
import BotonContinuar from './BotonContinuar';


//Crea la tabla par air marcando las incompativilidades

class TablaIncompatibilidades extends Component {
    constructor(props) {
        super(props);

        this.state = { tabla: [] };

        this.restringir = this.restringir.bind(this);
        this.reiniciar = this.reiniciar.bind(this);
        this.generaAmigoInvisible = this.generaAmigoInvisible.bind(this);

        this.refEnviar = new React.createRef();        //Referencia del boton
    }


    //Se ejecuta al montar el componente
    componentDidMount() {
        //Coge los participantes
        this.crearTabla();
    }

    //Pone la tabla en configuración original

    crearTabla() {

        var participantes = this.props.location.state;

        //Creamos la tabla con la primera columna con una equis y los participnates
        var baseTabla = [[null, ...participantes]]

        //Añade todas las cabeceras de fila
        participantes.map((x) => {
            baseTabla.push([x]);
        });
        rellenarTabla(baseTabla);

        this.setState({ tabla: [...baseTabla], copia: [...baseTabla] });

    }

    reiniciar() {
        this.crearTabla();
    }

    //Hace que cuando se marque una casilla se marque la contraria
    restringir(fila, columna) {

        let copiaTabla = this.state.tabla;  //Hace una copia del array

        copiaTabla[fila][columna] = !copiaTabla[fila][columna];       //Invierte la casilla

        copiaTabla[columna][fila] = !copiaTabla[columna][fila];     //Invierte la casilla que es la misma que la anterior                     
        this.setState({ tabla: [...copiaTabla] });    //Guarda los camibios añadiondeolos al estado

    }

    //Devuelve Array Participantes con las restricciones añadidas
    generarArrayParticipantes() {
        const tabla = this.state.tabla;    //Almacena la tabla 

        var arrObjetos = [];    //Crea una array que almacena todos los objetos

        //LLena el array de incompatibilidades de cada objeto
        for (var i = 1; i < tabla.length; i++) {

            var arrayRestringidos = [];

            for (var j = 1; j < tabla[0].length; j++) {

                if (tabla[i][j] === true) {

                    arrayRestringidos.push(tabla[0][j]);

                }
            }
            arrObjetos.push(new Participante(tabla[i][0], arrayRestringidos))

        }
        return arrObjetos;

    }

    //Hace el amigo invisible, devuelve si se ha podido realizar
    amigoInvisible(participantes) {


        var contador = 0;   //Almacena el número de repeticiones bucle

        var repetir;        //Almacena si el bucle se ha de repetir

        do {

            repetir = false;

            //Coge el nombre de todos los paerticipantes
            var nombresParticipantes = [...this.props.location.state];  //Crea una copia que va a barajar

            //Baraja
            shuffle(nombresParticipantes);

            //Se ejecuta una vez por cada objeto

            for (var i = 0; i < participantes.length; i++) {


                //Elimina todo lo que haya sido guardado en restriciones
                participantes[i].eliminarRestricciones();

                //Si no se puede añadir haz que el bucle se vuelva a repetir
                if (!participantes[i].setPersonaARegalar(nombresParticipantes.shift())) {

                    repetir = true; //Se repite

                    break;

                }

            }

            //Le suma uno al contador
            contador++;


        } while (contador < repeticiones && repetir === true);
        return !repetir;

    }

    generaAmigoInvisible() {

        const participantes = this.generarArrayParticipantes();


        if (this.amigoInvisible(participantes)) {

            //Almacena si hay que enviar por correo
            const correoNav = this.refEnviar.current.checked;

            //Crea lo que se va enviar a la siguiente página 
            var stateNavigate = { state: { correo: correoNav, participantes: participantes } };

            //Coge Navigate
            const { navigate } = this.props;

            navigate('/see-results', stateNavigate);



        } else {

            alert('No existe una combinación posible que cumpla todas las restricciones.');
        }

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
            <div id=''>
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
                    <input id='siDeseoEnviarlo' type='radio' name="enviar" value={false} defaultChecked />No
                </div>

                <button onClick={this.reiniciar}>Reiniciar tabla</button>

                <BotonContinuar texto='Generar Amigo Invisible' handleClick={this.generaAmigoInvisible} />

            </div>


        );
    }
}

//Creamos el hook que nos poermite usar location
export default function (props) {

    const location = useLocation(), navigate = useNavigate();

    return <TablaIncompatibilidades {...props} location={location} navigate={navigate} />

};