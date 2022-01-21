//Clase participanre
class Participante {

    constructor(nombre, restriciones = []) {

        this.nombre = nombre;               //Nombre del participanre
        this.restriciones = restriciones;   //A quien no puede regalar
        this.personaARegalar = undefined;   //A quien va ha regalar
    }

    //Comprueba si puede regalar a la persona
    setPersonaARegalar(a) {

        if (this.restriciones.indexOf(a) === -1) {

            this.personaARegalar = a;

            return true;
        }
        else {
            return false;
        }
    }

    //Elimina la persona a regalar
    borrar() {

        this.personaARegalar = undefined;
    }
}

export default Participante;