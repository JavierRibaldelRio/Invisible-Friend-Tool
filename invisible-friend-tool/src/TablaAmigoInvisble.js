import React, { Component } from 'react';
import FilaTablaAmigoInvisible from './FilaTablaAmigoInvisible';

//Devuelve la tabla donde se muestran los amigos invisibles
class TablaAmigoInvisible extends Component {
    constructor(props) {
        super(props);
    }
    render() {


        return (<table id='tabla_amigo_invisible'>

            <tbody>
                <tr>

                    <th>Participante</th>
                    <th>a de reglar a</th>
                    <th>mostrar</th>
                </tr>

                {
                    //Crea todas las filas de participantes 


                    this.props.participantes.map((a) => {
                        return <FilaTablaAmigoInvisible participante={a} key={a.nombre + 'filatablaincompativilidades'} />
                    })


                }
            </tbody>

        </table>);
    }
}

export default TablaAmigoInvisible;