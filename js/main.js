
/* Variables para el Canvas */
var canvas = document.querySelector('#juegoCanvas');
var lienzo = canvas.getContext("2d");
var widthCanvas = canvas.width;
var heightCanvas = canvas.height;

/* Variables para la serpiente */
var posXSerpiente = [
    60, 80, 100, 120
];

initGame();

function initGame(){
    dibujarParedes(lienzo, 20, 20, widthCanvas, heightCanvas);
    posicionarSerpiente();
}

function posicionarSerpiente(){
    for(var i = 0; i < posXSerpiente.length ; i++){
        dibujarSerpiente(posXSerpiente[i]);
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

function dibujarSerpiente(x){
    lienzo.beginPath();
    lienzo.fillStyle = "#2e490b";
    lienzo.fillRect(x, 60, 20, 20);
    lienzo.stroke();
}