import React, { Component } from 'react';
import FilaTablaAmigoInvisible from './FilaTablaAmigoInvisible';
import { useLocation } from 'react-router-dom';

//Devuelve la tabla donde se muestran los amigos invisibles
class TablaAmigoInvisible extends Component {
    constructor(props) {
        super(props);

        this.state = { participantes: [] };

        this.definirCorreo = this.definirCorreo.bind(this);
    }



    //Cuando se monta el componente
    componentDidMount() {

        this.setState({ participantes: [...this.props.location.state.participantes] });

    }

    definirCorreo(per, cor) {

        let copiaParticipantes = this.state.participantes; //Crea una copia

        copiaParticipantes.find(a => a.nombre === per).correo = cor;

        this.setState({ participantes: copiaParticipantes });

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

                    this.state.participantes.map((a) => {
                        return <FilaTablaAmigoInvisible participante={a} definirCorreo={this.definirCorreo} key={a.nombre + 'filatablaincompativilidades'} enviar={this.props.location.state.correo} />
                    })

                }
            </tbody>

        </table>);
    }
}

export default (props) => {

    const location = useLocation();

    return (<>

        <TablaAmigoInvisible {...props} location={location} />

    </>)



};