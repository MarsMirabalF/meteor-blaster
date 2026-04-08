const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

canvas.width = 1500;
canvas.height = 550;

const nave = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    tamanio: 20,
    color: "#befffb",
    angulo: 0,
    velocidadX: 0,
    velocidadY: 0
};

const teclas = {
    a: false,
    d: false,
    w: false,
    s: false
};

document.addEventListener("keydown", (e) => {
    if (e.key in teclas) teclas[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key in teclas) teclas[e.key] = false;
});

function actualizar() {
    if (teclas.a) {
        nave.angulo -= 0.05;
    }
    if (teclas.d) {
        nave.angulo += 0.05;
    }
    if (teclas.w) {
        nave.velocidadX += Math.sin(nave.angulo) * 0.2;
        nave.velocidadY -= Math.cos(nave.angulo) * 0.2;
    }
    if (teclas.s) {
        nave.velocidadX -= Math.sin(nave.angulo) * 0.2;
        nave.velocidadY += Math.cos(nave.angulo) * 0.2;
    }

    nave.x += nave.velocidadX;
    nave.y += nave.velocidadY;

    nave.velocidadX *= 0.98;
    nave.velocidadY *= 0.98;

    if (nave.x > canvas.width){ 
        nave.x = 0; 
    }
    if (nave.x < 0){ 
        nave.x = canvas.width; 
    }
    if (nave.y > canvas.height){ 
        nave.y = 0; 
    }
    if (nave.y < 0){ 
        nave.y = canvas.height; 
    }
}

function dibujarNave(x, y, tamanio, angulo) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angulo);
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

function juegoEnCurso() {
    ctx.fillStyle = "#000a27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    actualizar();
    dibujarNave(nave.x, nave.y, nave.tamanio, nave.angulo);

    requestAnimationFrame(juegoEnCurso);
}

juegoEnCurso();