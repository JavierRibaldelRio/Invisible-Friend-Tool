import Incompatibilidad from './Incompatibilidad';

//Devuelve una fila llena de incompatibilidades(checkbox)
function FilaTabla(props) {

    const fila = props.fila;       //Almacena las filas

    var celdasNormales = [];    //Almacena cada una de las celdas normales

    //Se ejecuta una vez por cada boolean en el array,añade las casillas de verificación a las zeldas y esta al array
    for (let i = 1; i < fila.length; i++) {


        var restringir = (() => { this.props.restringir(this.props.numeroFila, i) }).binsd(this); //Pepara la función de restringir   

        celdasNormales.push(
            <td key={'td' + fila[0] + i}/*Crea una clave con la i para celdas*/>

                <Incompatibilidad
                    regalador={fila[0]}                                  //Indica la persona que regala                          
                    valor={fila[i]}                                      //Indica el valor que tiene la celda               
                    bloqueado={(this.props.numeroFila === i)}            //Devuelve si esta bloqueada esa verificación
                    //Crea una función que manda a función restringir l a columna y la fila
                    restringirCompleta={restringir} />

            </td>)



    }

    return (<tr>

        {/*Pone en la primera celd ael nombre del regalador*/}
        <th>{fila[0]}</th>

        {celdasNormales}

    </tr>);
}

export default FilaTabla;