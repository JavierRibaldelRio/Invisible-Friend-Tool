//Script del servidor
//Javier Ribal del Río javierribal@gmail.com

const express = require('express');     //Importa express   

const PORT = process.env.PORT || 3001;  //Coge el puerto del entorno o usa el 3001 

const app = express();  //Inizailizamos el servidor

//Cogemos activa el cogedor de post de node

app.use(express.urlencoded({ extended: false }));
app.use(express.json('application/json'));

//Crea una nueva ruta
app.get('/api', (req, res) => {

    console.log('Hola otra vez : ' + req.body + 'ahora son las ' + Date());

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "*");


    res.json({ message: ' Esto aquffí dfdsf' })

})

//Genera el puerto del servidor
app.listen(PORT, () => {

    console.log('Hola desde ' + PORT);

});