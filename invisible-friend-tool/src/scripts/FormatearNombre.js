/**
 * 
 * Formatea un nombre para que salga con el siguiernte formato: "Antonio"
 * 
 */

import { primeraMayuscula } from "./FuncionesUtiles";

function formatName(name) {

    name = name.trim();      //Elimina los espacios del nombre por delante o por detras

    name = name.replace(/\s+/g, ' ');   //Elimina los dobles espacios

    name = name.toLowerCase();          //Lo pasa a minuculas

    name = primeraMayuscula(name);      //Pone la primera en mayúsculas 

    return name;

}

//Devuelve el input con la primera a mayúscula
function primeraMayuscula(t) {

    return t[0].toUpperCase() + t.slice(1);

}

export default formatName;

export { primeraMayuscula };