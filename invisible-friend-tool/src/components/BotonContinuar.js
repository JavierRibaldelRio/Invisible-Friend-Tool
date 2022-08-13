//Boton que se utiza para continuar con la aplicación

function BotonContinuar(props) {

    let handleClick = props.handleClick.bind(this);

    return (<button className="Boton-Continuar" onClick={handleClick}>{props.texto}</button>);
}


BotonContinuar.defaultProps = {


    handleClick: () => { },
    texto: ''
}

export default BotonContinuar;