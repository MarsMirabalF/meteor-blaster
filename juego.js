const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

canvas.width = 1500;
canvas.height = 550;

const nave = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    tamanio: 20,
    color: "#00ff99"
};

function dibujarNave(x, y, tamanio) {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.moveTo(0, -tamanio);
    ctx.lineTo(tamanio * 0.8, tamanio);
    ctx.lineTo(0, tamanio * 0.5);
    ctx.lineTo(-tamanio * 0.8, tamanio);
    ctx.closePath();

    ctx.strokeStyle = nave.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
}

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

dibujarNave(nave.x, nave.y, nave.tamanio);