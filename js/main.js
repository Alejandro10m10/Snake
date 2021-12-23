
var canvas = document.querySelector('#juegoCanvas');
var lienzo = canvas.getContext("2d");
var widthCanvas = canvas.width;
var heightCanvas = canvas.height;

dibujarParedes(lienzo, 20, 20, widthCanvas, heightCanvas);

function dibujarParedes(lienzo, xInicial, yInicial, widthCanvas, heightCanvas){
    xFinalyFinal = xInicial + yInicial;
    lienzo.beginPath();
    lienzo.lineWidth = "2";
    lienzo.rect(xInicial, yInicial, widthCanvas-xFinalyFinal, heightCanvas-xFinalyFinal);
    lienzo.stroke();
}
