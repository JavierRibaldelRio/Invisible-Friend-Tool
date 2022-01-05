//Clase participanre
class Participante {

    constructor(nombre, restriciones) {

        this.nombre = nombre;               //Nombre del participanre
        this.restriciones = restriciones;   //A quien no puede regalar
        this.personaARegalar = undefined;   //A quien va ha regalar
    }

    //Comprueba si puede regalar a la persona
    valido() {

        if (this.restriciones.indexOf(this.personaARegalar) === -1) {

            return true;
        }
        else {
            return false;
        }
    }
}

export default Participante;