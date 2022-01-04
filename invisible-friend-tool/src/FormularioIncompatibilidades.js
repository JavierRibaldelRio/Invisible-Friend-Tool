import React, { Component } from 'react';
import Incompatibilidad from './Incompatibilidad';


class FormularioIncompatibilidades extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<form>

            <h2>Incompatibilidades</h2>

            <p>En esta sección tienes que seleccionar a quien no puede regalar cada persona, puedes seleccionar más de uno</p>

            <Incompatibilidad participantes={this.props.participantes} participante={this.props.participantes[0]}></Incompatibilidad>

        </form>);
    }
}

export default FormularioIncompatibilidades;