
//Se ocupa de poner todas las casillas en false mnos las impresindibles




function rellenarTabla(arr) {

    for (var i = 1; i < arr.length; i++) {

        for (var j = 1; j < arr[0].length; j++) {

            if (j === i || arr[i][j] === true) {

                arr[i][j] = true;

            }

            else {

                arr[i][j] = false;
            }

        }
    }
}
export default rellenarTabla;