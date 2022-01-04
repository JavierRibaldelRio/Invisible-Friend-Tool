import React, { Component } from 'react';

//Se ocupa de crear cada grupo de checkbox
class Incompatibilidad extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        //Almacena la variable de participante
        const participante = this.props.participante



        return (

            //Crea un djiv con una ide predeterminada
            <div id={'incompativilidad' + participante}>

                <h3>{participante}</h3>
                {
                    //Se ejecuta por cada casillla
                    this.props.participantes.map((x) => {

                        //Devuelve una casilla de verificación por nombre
                        return <label htmlFor={'label' + x + participante} key={'label' + x + participante}>
                            <input type='checkbox' name={participante + 'checkbox'}
                                value={x} key={x + 'participante'} />{x}

                            <br />

                        </label>
                    })
                }

                <br></br>
                <hr />

            </div>

        );
    }
}

export default Incompatibilidad;