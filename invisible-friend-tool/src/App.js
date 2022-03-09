import PreguntarNombres from './PreguntarNombres';

import React, { Component } from 'react';
import TablaIncompatibilidades from './TablaIncompatibilidades';
import Participante from './ClaseParticipante';
import shuffle from './Barajar';
import TablaAmigoInvisible from './TablaAmigoInvisble';
import FormularioEmail from './FormularioEmail';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {

      participantes: [],                //alamcena todos los participantes en el amigo invisible
      tablaDeIncompatibilidad: [['x']],      //Es la tabla de la incompatibilidad
      bloqueadoGeneral: false,               //Indica si todavia se permiten añadir amigos
      objetosParticipantes: [],                //Almacena los objetos de los participantes
      enviarPorCorreo: false              //Indica si se va a envia r por correo los resultados
    }
  }
  componentDidMount() {
    //API

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('http://localhost:3001/api', requestOptions)
      .then(response => console.log('Success:', response))
      .then(data => console.log(data));

    // const dataToSend = JSON.stringify({ "usernam": "hey@mail.com", "password": "101010" });
    // let dataReceived = "";
    // fetch("http://localhost:3001/api", {
    //   credentials: "same-origin",
    //   mode: "same-origin",
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: dataToSend
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       return resp.json()
    //     } else {
    //       console.log("Status: " + resp.status)
    //       return Promise.reject("server")
    //     }
    //   })
    //   .then(dataJson => {
    //     dataReceived = JSON.parse(dataJson)
    //   })
    //   .catch(err => {
    //     if (err === "server") return
    //     console.log(err)
    //   })

    // console.log(`Received: ${dataReceived}`)

    // var formData = new FormData();

    // formData.append("username", "Groucho");
    // formData.append("accountnum", 123456);


    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "http://localhost:3001/api");
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


    // xhr.send(formData);

    // //Crea una nueva petición al servidor

    // var data = [12, 432, 23423]

    // var url = 'http://localhost:3001/api';
    // var data = { username: 'example' };

    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(data), // data can be `string` or {object}!
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(response => console.log('Success:', response));;

    // var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    // var theUrl = "/api";
    // xmlhttp.open("POST", theUrl);
    // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*')
    // xmlhttp.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));


    console.log('se ha ejecutado');

  }
  //Añade al arrayy de participantes el nuevo participante
  anyadirParticipante(a) {

    if (this.state.participantes.includes(a) === false) {

      //Copia de tabla de compatibilidad

      var copia = [...this.state.tablaDeIncompatibilidad];

      //Le anñade la a al matriz cero
      copia[0].push(a);

      //Le añade una nueva fila al array
      copia.push([a]);

      //LLena todos los huecos en blanco en la posición de de false y se asegura de que los que sean true por obligación,sehan true
      for (var i = 1; i < copia.length; i++) {

        for (var j = 1; j < copia[0].length; j++) {

          if (j === i || copia[i][j] === true) {

            copia[i][j] = true;

          }

          else {

            copia[i][j] = false;
          }

        }
      }
      this.setState({ participantes: this.state.participantes.concat(a), tablaDeIncompatibilidad: [...copia] }); //Anyade al estado la nueva persona

    }
    else {
      alert('Este nombre ya esta en uso, por favor, introduzca uno diferente')
    }


  }

  //Se ocupa de reiniciar la tabla (ponerlo casi todo a false)

  reiniciarTabla() {

    var copia = [...this.state.tablaDeIncompatibilidad]

    for (var i = 1; i < copia.length; i++) {

      for (var j = 1; j < copia[0].length; j++) {

        if (j === i) {

          copia[i][j] = true;

        }

        else {

          copia[i][j] = false;
        }

      }
    }

    this.setState({ tablaDeIncompatibilidad: copia });    //Guarda los camibios añadiondeolos al estado

  }

  //Se ocupa de cambiar las casillas correspondientes a su nuevo valor
  restringir(fila, columna) {

    let copia = [...this.state.tablaDeIncompatibilidad];  //Hace una copia del array

    copia[fila][columna] = !copia[fila][columna];       //Invierte la casilla

    copia[columna][fila] = !copia[columna][fila];     //Invierte la casilla que es la misma que la anterior

    this.setState({ tablaDeIncompatibilidad: copia });    //Guarda los camibios añadiondeolos al estado

  }


  //Hace el amigo invisible

  amigoInvisible(enviar) {

    this.setState({ bloqueadoGeneral: true, enviarPorCorreo: enviar });    //Evita que se puedan seguir añadiendo persona o cambiado restriciones

    const tabla = [...this.state.tablaDeIncompatibilidad];    //Almacena la tabla 

    var arrObjetos = [];    //Crea una array que almacena todos los objetos

    //LLena el array de incompatibilidades de cada objeto
    for (var i = 1; i < tabla.length; i++) {

      var arrayRestringidos = [];

      for (var j = 1; j < tabla[0].length; j++) {

        if (tabla[i][j] === true) {

          arrayRestringidos.push(tabla[0][j]);

        }
      }
      arrObjetos.push(new Participante(tabla[i][0], arrayRestringidos))

    }

    var contador = 0;       //Contador que almacena en número de iteraciones que ha tenido el bucle

    var repetir = true;     //Comprueba si el bucle se tiene que repetir

    //Para que se repita 100 veces
    while (contador < 1000 && repetir === true) {
      repetir = false;  //Dice que ya no hay que repetir
      var copiaABarajar = [...this.state.participantes];  //Crea una copia que va a brajar

      shuffle(copiaABarajar);   //BAraja

      //Se ejecuta una vez por cada objeto
      arrObjetos.map((x) => {


        //Elimina todo lo que haya sido guardadro
        x.borrar();

        //Si no se puede añadir haz que el bucle se vuelva a repetir
        if (x.setPersonaARegalar(copiaABarajar.shift()) === false) {

          repetir = true; //Se repite

        }

        //Le suma uno al contador
        contador++;
      });

    }

    //Si no ha salido nininguan combinación posible
    if (repetir === true) {

      //Avisa de que no hay combinaciones posibles
      alert('No existe una combinación posible que cumpla todas las restricciones.');

      this.setState({ bloqueadoGeneral: false });
    }
    else {

    }
    this.setState({ objetosParticipantes: arrObjetos });

  }

  cambiarCorreo(per, cor) {

    let copiaObjetos = this.state.objetosParticipantes; //Crea una copia

    copiaObjetos.find(a => a.nombre === per).correo = cor;

    this.setState({ objetosParticipantes: copiaObjetos });


  }

  //Esta función envia al servidor los datos, el servidor envia los correos

  enviarAlServidor(texto) {

    var arrayCorreosTextos = [];    //Almacena todos los textos y los correos

    //Por cada participanre
    this.state.objetosParticipantes.map((o) => {

      //Añado al array que va ir al servidor
      arrayCorreosTextos.push({
        email: o.correo,
        texto: texto.replace('**DESTINATARIO**', o.nombre).replace('**REGALADO**', o.personaARegalar)
      });

    });


  }

  render() {

    return (
      <div className="App">
        <PreguntarNombres
          anyadir={this.anyadirParticipante.bind(this)}          //Funciónque añade un nuevo participante al amigo invisible
          participantes={this.state.participantes}               //Array que conteine a todos los participantes
          bloqueadoGeneral={this.state.bloqueadoGeneral}         //Si se pueden añadir o no personas
        />

        <TablaIncompatibilidades

          tabla={this.state.tablaDeIncompatibilidad}            //La tabla de compativilidad
          bloqueadoGeneral={this.state.bloqueadoGeneral}        //Indiaca si todavia se pueden o no su puede añadir compañeros
          participantes={this.state.participantes}              //Todos los participantes, para crear las cabeceras

          restringir={this.restringir.bind(this)}               //La función que hay para restringir alguna pareja
          reiniciar={this.reiniciarTabla.bind(this)}            //Manda la funciónd e reinicair la tabla
          amigoInvisible={this.amigoInvisible.bind(this)}       //Le manda la función que hace el amigo invisible

        />

        <TablaAmigoInvisible participantes={this.state.objetosParticipantes} enviar={this.state.enviarPorCorreo} definirCorreo={this.cambiarCorreo.bind(this)}></TablaAmigoInvisible>

        <FormularioEmail enviarAlServidor={this.enviarAlServidor.bind(this)}></FormularioEmail>

      </div>

    );

  }
}

export default App;
