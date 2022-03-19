import React, { Component } from 'react';

class PreguntarEnviarCorreo extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (<form>

            Desea Enviar por correo el resultado:

            <input id='siDeseoEnviarlo' type='radio' name="enviar" value={true} />Sí
            <input id='siDeseoEnviarlo' type='radio' name="enviar" value={false} />No


        </form>);
    }
}

export default PreguntarEnviarCorreo;