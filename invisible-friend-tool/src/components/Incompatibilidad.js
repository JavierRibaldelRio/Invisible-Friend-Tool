//Se ocupa de crear cada grupo de checkbox

function Incompatibilidad(props) {
    const regalador = props.regalador;

    var handleChange = props.restringirCompleta.bind(this); //Al cmabiarse

    return (
        //Devuelve una casilla de verificación con las características introducidas
        <label htmlFor={'label' + regalador}>
            <input type='checkbox'
                name='tablaIncompatibilidades'
                checked={props.valor}                                      //Indica si esta o no esta marcada la check box
                onChange={handleChange}                                    //En el cambio ejecuta la función de cabio  
                disabled={this.props.bloqueado}                             //En caso de que se especifique bloquea la casilla
            />
        </label>
    );
}

export default Incompatibilidad;