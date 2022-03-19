//Script del servidor
//Javier Ribal del Río javierribal@gmail.com
require('dotenv').config()              //Activa el .env
const express = require('express');     //Importa express  

var nodemailer = require('nodemailer'); //Importa Nodemailer

// const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;  //Coge el puerto del entorno o usa el 3001 

const app = express();  //Inizailizamos el servidor

//Cogemos activa el cogedor de post de node

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Crea una nueva ruta

//Activa el servidor de correo

// var gestor = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.E_MAIL_USER,
//         pass: process.env.E_MAIL_PASSWORD
//     }
// });

//Se utiliza para añadir todas las cabeceras
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Se pone .post porqué utiliza el metodo
app.post('/api', (req, res) => {

    console.log(req.body);  //Muestra por la consola el texto

    // const mensaje = 'Hola, soy yo'

    // var mailOptions = {
    //     from: 'tucorreo@gmail.com',
    //     to: 'mi-amigo@yahoo.com',
    //     subject: 'Asunto Del Correo',
    //     text: mensaje
    // };

    // gestor.sendMail(mailOptions, (err, inf) => {

    //     if (err) {

    //         console.error('Se ha producido un error: ' + err);
    //     }
    //     else {

    //         console.info('Email enviado: ' + inf);
    //     }
    // });

    res.status(200).type('html').json({ message: ' Esto aquffí dfdsf' })

})

//Genera el puerto del servidor
app.listen(PORT, () => {

    console.log('Hola desde ' + PORT);

});