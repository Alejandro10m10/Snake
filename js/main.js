
/* Variables para el Canvas */
var canvas = document.querySelector('#juegoCanvas');
var lienzo = canvas.getContext("2d");
var widthCanvas = canvas.width;
var heightCanvas = canvas.height;

/* Variables para la serpiente */

var posSerpiente = [ //Pisicion inicial de la serpiente en el eje 'x' y 'y'
    { posX: 60, posY: 60 },
    { posX: 75, posY: 60 },
    { posX: 90, posY: 60 },
    { posX: 105, posY: 60 },
];

//var posYSerpiente = 60;
var widthSerpiente = 15;
var heightSerpiente = 15;

var pixelesMovimiento = 15;

/* Variables para el movimiento de la serpiente */
var MOVEMENTS = {
    //Utilizamos el KeyCode de la tecla
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
};

/* ------------------------------------------------------- */
/* ----------------- Inicio del juego -------------------- */
/* ------------------------------------------------------- */
initGame();
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

document.addEventListener("keydown", moverSerpiente);

var lastMovement = MOVEMENTS.RIGHT;
var newMovement;

function moverSerpiente(event){

    //console.log("Ultimo movimiento "+ lastMovement);

    newMovement = event.keyCode;

    if(lastMovement == MOVEMENTS.RIGHT && newMovement == MOVEMENTS.LEFT){
        console.log('No puedo ir hacia la izquierda');
        return;
    } else if(lastMovement == MOVEMENTS.LEFT && newMovement == MOVEMENTS.RIGHT){
        console.log('No puedo ir hacia la derecha');
        return;
    } else if(lastMovement == MOVEMENTS.UP && newMovement == MOVEMENTS.DOWN){
        console.log('No puedo ir hacia abajo');
        return;
    } else if(lastMovement == MOVEMENTS.DOWN && newMovement == MOVEMENTS.UP){
        console.log('No puedo ir hacia arriba');
        return;
    } else{
        lastMovement = newMovement;
    }
    
    switch(event.keyCode){
        case MOVEMENTS.UP: //Restarle a la posicion y (-y)
            generarMovimiento(true, false, false, false);
            break;
        case MOVEMENTS.DOWN: //Sumarle a la posicion y (+y)
            generarMovimiento(false, false, true, false);
            break;
        case MOVEMENTS.LEFT: //Restarle a la posicion x (-x)
            generarMovimiento(false, false, false, true);
            break;
        case MOVEMENTS.RIGHT:  //Sumarle a la posicion x (+x)
            generarMovimiento(false, true, false, false);
            break;
        default:
            console.log('Otra tecla');
    }
}

function generarMovimiento(upMovement, rightMovement, downMovement, leftMovement ){

    posSerpiente.shift();
    var newMovement;

    var xlastPosition = posSerpiente[posSerpiente.length-1].posX;
    var ylastPosition = posSerpiente[posSerpiente.length-1].posY;
    var xNewPosition, yNewPosition;

    if(rightMovement){
        // Si el movimiento es hacia la derecha o izquierda tenemos que sumarle o restarle a la posicion x pero la posicion en y se mantiene
        xNewPosition = xlastPosition + pixelesMovimiento;
        yNewPosition = ylastPosition;
    } else if(leftMovement){
        // Si el movimiento es hacia arriba o abajo tenemos que sumarle o restarle a la posicion y pero la posicion en x se mantiene
        xNewPosition = xlastPosition - pixelesMovimiento;
        yNewPosition = ylastPosition;
    } else if(downMovement){
        // Si el movimiento es hacia arriba o abajo tenemos que sumarle o restarle a la posicion y pero la posicion en x se mantiene
        xNewPosition = xlastPosition;
        yNewPosition = ylastPosition + pixelesMovimiento;
    } else if(upMovement){
        // Si el movimiento es hacia arriba o abajo tenemos que sumarle o restarle a la posicion y pero la posicion en x se mantiene
        xNewPosition = xlastPosition;
        yNewPosition = ylastPosition - pixelesMovimiento;
    }

    newMovement = { posX: xNewPosition, posY: yNewPosition };

    posSerpiente.push(newMovement);
    repaintStage();
    
}


function repaintStage(){
    lienzo.clearRect(0, 0, widthCanvas, heightCanvas);
    dibujarParedes(lienzo, 15, 15, widthCanvas, heightCanvas);
    posicionarSerpiente();
}


function initGame(){
    dibujarParedes(lienzo, 15, 15, widthCanvas, heightCanvas);
    posicionarSerpiente();
}

function posicionarSerpiente(){
    for(var i = 0; i < posSerpiente.length ; i++){
        dibujarSerpiente(posSerpiente[i].posX, posSerpiente[i].posY);
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