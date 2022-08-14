import React, { Component } from 'react';
import FilaTablaAmigoInvisible from './FilaTablaAmigoInvisible';
import { useLocation, useNavigate } from 'react-router-dom';
import BotonContinuar from './BotonContinuar';

//Devuelve la tabla donde se muestran los amigos invisibles
class TablaAmigoInvisible extends Component {
    constructor(props) {
        super(props);

        this.state = { participantes: [] };

        this.definirCorreo = this.definirCorreo.bind(this);

        this.continuar = this.continuar.bind(this);
    }


    s
    //Cuando se monta el componente
    componentDidMount() {

        this.setState({ participantes: [...this.props.location.state.participantes] });

    }

    definirCorreo(per, cor) {

        let copiaParticipantes = this.state.participantes; //Crea una copia

        copiaParticipantes.find(a => a.nombre === per).correo = cor;

        this.setState({ participantes: copiaParticipantes });

    }

    //Pasa a la siguiente página
    continuar() {

        //Coge Navigate
        const { navigate } = this.props;

        const stateNavigate = { state: this.state.participantes };

        navigate('/send-email', stateNavigate);

    }

    render() {

        var botonContinuar = (this.props.location.state.correo) ? <BotonContinuar texto="Continuar Enviando Correo" handleClick={this.continuar} /> : null;

        return (<>
            <table id='tabla_amigo_invisible'>

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

            </table>
            {botonContinuar}
        </>);
    }
}

export default (props) => {

    const location = useLocation(), navigate = useNavigate();

    return (<>

        <TablaAmigoInvisible {...props} location={location} navigate={navigate} />

    </>)



};