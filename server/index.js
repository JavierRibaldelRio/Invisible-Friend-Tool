//Script del servidor
//Javier Ribal del Río javierribal@gmail.com

const express = require('express');     //Importa express  

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

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/api', (req, res) => {

    // console.log(request.method);
    console.log('Hola otra vez : ' + req.body.username + 'ahora son las ' + Date());

    // res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    res.status(200).type('html').json({ message: ' Esto aquffí dfdsf' })

})

//Genera el puerto del servidor
app.listen(PORT, () => {

    console.log('Hola desde ' + PORT);

});