//Script del servidor
//Javier Ribal del Río javierribal@gmail.com

const express = require('express');     //Importa express   

const PORT = process.env.PORT || 3001;  //Coge el puerto del entorno o usa el 3001 

const app = express();  //Inizailizamos el servidor

//Cogemos activa el cogedor de post de node

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Crea una nueva ruta
app.get('/api', (req, res) => {

    // console.log(request.method);
    // console.log('Hola otra vez : ' + req.body + 'ahora son las ' + Date());

    // res.statusCode = 200;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);



    res.json({ message: ' Esto aquffí dfdsf' })

    console.log(req.body.user.name);
    console.log(req.body.user.email);

})

//Genera el puerto del servidor
app.listen(PORT, () => {

    console.log('Hola desde ' + PORT);

});