//Crea un li del paricipante

function LiParticipante(props) {

    const participante = props.participante;    //Nombre del participante

    const id = 'LiParticipante' + participante; //Id del participante

    var eliminarParticipante = () => {

        props.eliminar(participante);
    }

    eliminarParticipante = eliminarParticipante.bind(this);


    return (<li key={participante} id={id} onClick={eliminarParticipante}>{participante}</li>);
}



export default LiParticipante;