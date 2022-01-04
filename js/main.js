
/* Variables para el Canvas */
var canvas = document.querySelector('#juegoCanvas');
var lienzo = canvas.getContext("2d");
var widthCanvas = canvas.width;
var heightCanvas = canvas.height;

var consola = document.querySelector(".consola");
var imgInstructions = document.querySelector(".keysGame");
var scoreTitle = document.querySelector(".userScore");
var currentGame = false;

var score = 0;
var ciclo;
var FPS = 1000 / 15;

/* Variables para las paredes del mapa */
var wallDistance = 15;

var topLimit = 0;
var lefttLimit = 0;
var rightLimit = widthCanvas - wallDistance;
var bottomLimit = heightCanvas - wallDistance;

/* Variables para la serpiente */
var posSerpiente = [ //Posición inicial de la serpiente en el eje 'x' y 'y'
    { posX: 60, posY: 60 },
    { posX: 75, posY: 60 },
    { posX: 90, posY: 60 },
    { posX: 105, posY: 60 },
];

//var posYSerpiente = 60;
var widthSerpiente = 15;
var heightSerpiente = widthSerpiente;

var pixelesMovimiento = 15;

/* Variables para la comida de la serpiente */
var posComida = [];
var valMinComida = wallDistance; // Esto puede variar dependiendo del canvas
var valMaxComida = widthCanvas - (wallDistance * 2); // Esto puede variar dependiendo del canvas

var limitFoodPosition = valMaxComida / valMinComida; // Valor maximo en la que nuestros 15px del tamaño de la comida puede generarse dentro del mapa

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
document.addEventListener('keydown', moverSerpiente);  

var defaultFitstMovemnt = true;
var lastMovement;
var newMovement;

var bandera = false;

function moverSerpiente(event){
    currentGame = true;

    if(currentGame){
        canvas.classList.remove("snakeCollision");
        consola.classList.remove("snakeCollision");
        viewInstructions(false);
    }

    // El movimiento por defecto es derecha
    if(defaultFitstMovemnt){
        clearInterval(ciclo);
        ciclo = setInterval( function() { generarMovimiento(false, true, false, false); }, FPS );
        defaultFitstMovemnt = false;
        return;
    }

    newMovement = event.keyCode;

    if(lastMovement == MOVEMENTS.RIGHT && newMovement == MOVEMENTS.LEFT){
        return; //console.log('No puedo ir hacia la izquierda');
    } else if(lastMovement == MOVEMENTS.LEFT && newMovement == MOVEMENTS.RIGHT){
        return; // console.log('No puedo ir hacia la derecha');
    } else if(lastMovement == MOVEMENTS.UP && newMovement == MOVEMENTS.DOWN){
        return; // console.log('No puedo ir hacia abajo');
    } else if(lastMovement == MOVEMENTS.DOWN && newMovement == MOVEMENTS.UP){
        return; // console.log('No puedo ir hacia arriba');
    } else if(lastMovement == newMovement){ 
        return; //Si la tecla precionada es igual a la anterior el sentido no ha cambiado y el evento continua ejecutandose
    } else{
        lastMovement = newMovement;
    }
    
    switch(event.keyCode){
        case MOVEMENTS.UP: //Restarle a la posicion y (-y)
            clearInterval(ciclo);
            ciclo = setInterval( function() { generarMovimiento(true, false, false, false); }, FPS );
            break;
        case MOVEMENTS.DOWN: //Sumarle a la posicion y (+y)
            clearInterval(ciclo);
            ciclo = setInterval( function() { generarMovimiento(false, false, true, false); }, FPS );
            break;
        case MOVEMENTS.LEFT: //Restarle a la posicion x (-x)
            clearInterval(ciclo);
            ciclo = setInterval( function() { generarMovimiento(false, false, false, true); }, FPS );
            break;
        case MOVEMENTS.RIGHT:  //Sumarle a la posicion x (+x)
            clearInterval(ciclo);
            ciclo = setInterval( function() { generarMovimiento(false, true, false, false); }, FPS );
            break;
        default:
            return;
    }
}


function colisiones(movement){
    /* Colisiones de pared */
    if(movement.posY == topLimit || movement.posY == bottomLimit || movement.posX == lefttLimit || movement.posX == rightLimit || bodyCollisions(movement)){
        shakeCanvas();
        restartGame();
        return false;
    }  else{
        return true;
    }
}

function bodyCollisions(movement){
    for(var i = 0; i < posSerpiente.length ; i++){
        if(posSerpiente[i].posX == movement.posX && posSerpiente[i].posY == movement.posY){
            return true;
        }
    }
}

function restartGame(){
    clearInterval(ciclo);
    defaultFitstMovemnt = true;

    lastMovement = MOVEMENTS.RIGHT;
    newMovement = "";
    
    score = 0;
    scoreTitle.innerHTML = (score);
    //alert('perdiste');
    initGame();
    repaintStage();
    generarComida();
}

function shakeCanvas(){
    currentGame = false;
    viewInstructions(true);
    canvas.classList.add("snakeCollision");
    consola.classList.add("snakeCollision");
}

function generarMovimiento(upMovement, rightMovement, downMovement, leftMovement ){

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

    
    if(eatFood(xNewPosition, yNewPosition)){
        repaintStage();
        generarComida();
        return;
    }

    newMovement = { posX: xNewPosition, posY: yNewPosition };

    if(colisiones(newMovement)){
        posSerpiente.shift();
        posSerpiente.push(newMovement);
        repaintStage();
        getLastPositionFood();
    }
}

function eatFood(xNewSnakePosition, yNewSnakePosition){

    var posXLastFood = posComida[0].posX;
    var posYLastFood = posComida[0].posY;

    if(xNewSnakePosition == posXLastFood && yNewSnakePosition == posYLastFood){
        newSnake = { posX: posXLastFood, posY: posYLastFood };
        posSerpiente.push(newSnake);
        sumarPuntos();
        return true;
    }
}

function sumarPuntos(){
    scoreTitle.innerHTML = (++score);
}

function repaintStage(){
    lienzo.clearRect(0, 0, widthCanvas, heightCanvas);
    dibujarParedes(lienzo, wallDistance, wallDistance, widthCanvas, heightCanvas);
    posicionarSerpiente();
}

function initGame(){
    
    posSerpiente = [ //Posición inicial de la serpiente en el eje 'x' y 'y'
        { posX: 60, posY: 60 },
        { posX: 75, posY: 60 },
        { posX: 90, posY: 60 },
        { posX: 105, posY: 60 },
    ];

    dibujarParedes(lienzo, wallDistance, wallDistance, widthCanvas, heightCanvas);
    generarComida();
    posicionarSerpiente();
}

function viewInstructions(setRemove){
    if(setRemove){
        imgInstructions.classList.remove("seeKeyGame");
    } else{
        imgInstructions.classList.add("seeKeyGame");
    }
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

/* ------------------- Comida ------------------ */
function randomPosition(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarComida(){

    var posXFood = widthSerpiente * randomPosition(1, limitFoodPosition);
    var posYFood = heightSerpiente * randomPosition(1, limitFoodPosition);

    for(var i = 0; i < posSerpiente.length ; i++){
        if(posSerpiente[i].posX == posXFood && posSerpiente[i].posY == posYFood){
            generarComida();
            return;
        }
    }

    comidaRectangular2(posXFood, posYFood); //Comida rectangular
    //comidaCircular2(posXFood, posYFood);

    posComida = [ //Posición inicial de la comida en el eje 'x' y 'y'
        {posX: posXFood, posY: posYFood},
    ];
}

function getLastPositionFood(){
    comidaRectangular1();
    //comidaCircular1();
}

function comidaRectangular1(){
    lienzo.beginPath();
    lienzo.fillStyle = "#165055";
    lienzo.fillRect(posComida[0].posX, posComida[0].posY, widthSerpiente, heightSerpiente);
    lienzo.stroke();
}

function comidaRectangular2(posXFood, posYFood){
    lienzo.beginPath();
    lienzo.fillStyle = "#165055";
    lienzo.fillRect(posXFood, posYFood, widthSerpiente, heightSerpiente);
    lienzo.stroke();
}

function comidaCircular1(){
    lienzo.beginPath();
    var X = posComida[0].posX;
    var Y = posComida[0].posY;
    var r = 4.5;
    lienzo.strokeStyle = "#2e490b";
    lienzo.fillStyle = "#2e490b";
    lienzo.lineWidth = 5;
    lienzo.arc(X+7,Y+8,r,0,2*Math.PI);
    lienzo.fill();
    lienzo.stroke();
}

function comidaCircular2(posXFood, posYFood){
    lienzo.beginPath();
    var X = posXFood;
    var Y = posYFood;
    var r = 4.5;
    lienzo.strokeStyle = "#2e490b";
    lienzo.fillStyle = "#2e490b";
    lienzo.lineWidth = 5;
    lienzo.arc(X+7,Y+8,r,0,2*Math.PI);
    lienzo.fill();
    lienzo.stroke();
}
