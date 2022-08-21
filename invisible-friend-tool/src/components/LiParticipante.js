//Crea un li del paricipante

function LiParticipante(props) {

    const participante = props.participante;    //Nombre del participante

    const id = 'LiParticipante' + participante; //Id del participante

    const title = 'Eliminar a ' + participante;    //Crea la etiqueta
    var eliminarParticipante = () => {

        props.eliminar(participante);
    }

    eliminarParticipante = eliminarParticipante.bind(this);


    return (<li key={participante} title={title} id={id} onClick={eliminarParticipante}>{participante}</li>);
}



export default LiParticipante;