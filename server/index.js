//Script del servidor
//Javier Ribal del Río javierribal@gmail.com
require('dotenv').config()              //Activa el .env
const express = require('express');     //Importa express  
const path = require('path');           //Importa Path
var nodemailer = require('nodemailer'); //Importa Nodemailer

// const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;  //Coge el puerto del entorno o usa el 3001 

const app = express();  //Inizailizamos el servidor

//Cogemos activa el cogedor de post de node

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Para Sendinblue

const transporter = nodemailer.createTransport({
    service: 'SendinBlue', // no need to set host or port etc.
    auth: {
        user: process.env.E_MAIL_USER,
        pass: process.env.E_MAIL_PASSWORD
    }
});


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


    console.log('Se encuentra en /api')

    console.log(req.body);

    //Reqbody almacena toda la información de correos

    req.body.map((x) => {

        transporter.sendMail({
            to: x.to,
            from: process.env.E_MAIL_FROM,
            subject: x.subject,
            html: x.text
        })
            .then((res) => console.log("Successfully sent"))
            .catch((err) => console.log("Failed ", err))

    });

    res.status(200).type('html').json({ message: ' Esto aquffí dfdsf' })

});

//Utiliza  
app.use("/", express.static(path.resolve(__dirname, '../invisible-friend-tool/build')));


//Genera el puerto del servidor
app.listen(PORT, () => {
    console.log('Hola desde ' + PORT);

});