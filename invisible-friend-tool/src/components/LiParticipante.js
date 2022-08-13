//Crea un li del paricipante

function LiParticipante(props) {

    const participante = props.participante;
    const id = 'LiParticipante' + participante;
    return (<li key={participante} id={id}>{participante}</li>);
}



export default LiParticipante;