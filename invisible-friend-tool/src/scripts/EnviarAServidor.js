function postearCorreos(correos) {

    const opciones = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(correos)
    };
    fetch('/api', opciones)
        .then(response => console.log('Conexión correcta:', response))
        .then(data => console.log(data));

}

export default postearCorreos;