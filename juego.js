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
    if (e.key in teclas){
        teclas[e.key] = true
    };
});

document.addEventListener("keyup", (e) => {
    if (e.key in teclas){ 
        teclas[e.key] = false;
    }
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

const CANTIDAD_ASTEROIDES = 8;

function crearAsteroide() {
    const radio = 20 + Math.random() * 30;

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    const velocidadX = (Math.random() - 0.5) * 1.5;
    const velocidadY = (Math.random() - 0.5) * 1.5;

    const vertices = [];
    const numVertices = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numVertices; i++) {
        const angulo = (i / numVertices) * Math.PI * 2;
        const distancia = radio * (0.7 + Math.random() * 0.3);
        vertices.push({
            x: Math.cos(angulo) * distancia,
            y: Math.sin(angulo) * distancia
        });
    }

    return { x, y, radio, velocidadX, velocidadY, vertices };
}

const asteroides = [];
for (let i = 0; i < CANTIDAD_ASTEROIDES; i++) {
    asteroides.push(crearAsteroide());
}

function actualizarAsteroides() {
    for (const ast of asteroides) {
        ast.x += ast.velocidadX;
        ast.y += ast.velocidadY;

        if (ast.x > canvas.width + ast.radio){
            ast.x = -ast.radio;
        }
        if (ast.x < -ast.radio){           
            ast.x = canvas.width + ast.radio;
        }
        if (ast.y > canvas.height + ast.radio){
            ast.y = -ast.radio;
        }
        if (ast.y < -ast.radio){         
            ast.y = canvas.height + ast.radio;
        }
    }
}

function dibujarAsteroides() {
    for (const ast of asteroides) {
        ctx.save();
        ctx.translate(ast.x, ast.y);

        ctx.beginPath();
        ctx.moveTo(ast.vertices[0].x, ast.vertices[0].y);
        for (let i = 1; i < ast.vertices.length; i++) {
            ctx.lineTo(ast.vertices[i].x, ast.vertices[i].y);
        }
        ctx.closePath();

        ctx.strokeStyle = "#a0a0c0";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
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

    actualizarAsteroides();

    dibujarNave(nave.x, nave.y, nave.tamanio, nave.angulo);

    dibujarAsteroides();

    requestAnimationFrame(juegoEnCurso);
}

juegoEnCurso();