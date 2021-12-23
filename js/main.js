
/* Variables para el Canvas */
var canvas = document.querySelector('#juegoCanvas');
var lienzo = canvas.getContext("2d");
var widthCanvas = canvas.width;
var heightCanvas = canvas.height;

/* Variables para la serpiente */

var posXSerpiente = [ //Pisicion inicial de la serpiente en el eje X
    60, 80, 100, 120
];

var posYSerpiente = 60;
var widthSerpiente = 20;
var heightSerpiente = 20;

/* Variables para el movimiento de la serpiente */
var MOVEMENTS = {
    //Utilizamos el KeyCode de la tecla
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
};

document.addEventListener("keyup", moverSerpiente);

function moverSerpiente(event){
    switch(event.keyCode){
        case MOVEMENTS.UP:
            console.log('Arriba'); //Restarle a la posicion y (-y)
            break;
        case MOVEMENTS.DOWN:
            console.log('Abajo'); //Sumarle a la posicion y (+y)
            break;
        case MOVEMENTS.LEFT:
            console.log('Izquierda'); //Restarle a la posicion x (-x)
            break;
        case MOVEMENTS.RIGHT:  //Sumarle a la posicion x (+x)
            generarMovimientoDerecha();
            break;
        default:
            console.log('Otra tecla');
    }
}

function generarMovimientoDerecha(){
    posXSerpiente.shift();
    var posicion = posXSerpiente[posXSerpiente.length-1] + 20;
    posXSerpiente.push(posicion);
    repaintStage();
    posicionarSerpiente();

}

function repaintStage(){
    lienzo.clearRect(0, 0, widthCanvas, heightCanvas);
    dibujarParedes(lienzo, 20, 20, widthCanvas, heightCanvas);
}


/* ------------------------------------------------------- */
/* ----------------- Inicio del juego -------------------- */
/* ------------------------------------------------------- */
initGame();
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */


function initGame(){
    dibujarParedes(lienzo, 20, 20, widthCanvas, heightCanvas);
    posicionarSerpiente();
}

function posicionarSerpiente(){
    for(var i = 0; i < posXSerpiente.length ; i++){
        dibujarSerpiente(posXSerpiente[i], posYSerpiente);
    }
}

function dibujarParedes(lienzo, xInicial, yInicial, widthCanvas, heightCanvas){
    xFinalyFinal = xInicial + yInicial;
    lienzo.beginPath();
    lienzo.lineWidth = "2";
    lienzo.rect(xInicial, yInicial, widthCanvas-xFinalyFinal, heightCanvas-xFinalyFinal);
    lienzo.stroke();
    lienzo.closePath();
}

function dibujarSerpiente(posXSerpiente, posYSerpiente){
    lienzo.beginPath();
    lienzo.fillStyle = "#2e490b";
    lienzo.fillRect(posXSerpiente, posYSerpiente, widthSerpiente, heightSerpiente);
    lienzo.stroke();
}