//Crea la lista de participantes

import LiParticipante from './LiParticipante';

function ListaParticipantes(props) {

    var eliminar = props.eliminar.bind(this);

    return (<ul id='listaParticipantes'>

        {
            props.participantes.map((x) =>
                <LiParticipante key={x} participante={x} eliminar={eliminar} />
            )
        }
    </ul>);
}


export default ListaParticipantes;