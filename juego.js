const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const simboloNave = new Image();
simboloNave.src = "icons/acbf.png";

canvas.width = 1500;
canvas.height = 550;

let vidas = 3;
let invencible = false;
let tiempoInvencible = 0;
const DURACION_INVENCIBLE = 180;

const nave = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    tamanio: 25,
    color: "#000000",
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

function respawnNave() {
    nave.x = canvas.width / 2;
    nave.y = canvas.height / 2;
    nave.velocidadX = 0;
    nave.velocidadY = 0;
    nave.angulo = 0;
    invencible = true;
    tiempoInvencible = DURACION_INVENCIBLE;
}

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

    if (invencible) {
        tiempoInvencible--;
    if (tiempoInvencible <= 0) {
        invencible = false;
        }
    }
}

const CANTIDAD_ASTEROIDES = 8;

function crearAsteroide() {
    const radio = 20 + Math.random() * 30;

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    
    while(nave.x == x && nave.y == y){
       x = Math.random() * canvas.width; 
       y = Math.random() * canvas.height;
    }

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

function gameOver() {
    vidas = 0;
    ctx.fillStyle = "#000a27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff4444";
    ctx.font = "bold 64px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("Perdiste... :(", canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px 'Courier New'";
    ctx.fillText("Recarga la página para reiniciar", canvas.width / 2, canvas.height / 2 + 60);
}


function verificarColisiones() {
    if (invencible) {
        return;
    }
    for (const ast of asteroides) {
        const dx = nave.x - ast.x;
        const dy = nave.y - ast.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        const radioColision = ast.radio * 0.85;

        if (distancia < nave.tamanio + radioColision) {
            vidas--;
            if (vidas <= 0) {
                gameOver();
            } else {
                respawnNave();
            }
            break;
        }
    }
}

function inicializarVidas() {
    const contenedor = document.getElementById("contenedorVidas");
    contenedor.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = "icons/vida.png";
        img.id = `vida-${i}`;
        contenedor.appendChild(img);
    }
}

function actualizarVidasHTML() {
    for (let i = 0; i < 3; i++) {
        const img = document.getElementById(`vida-${i}`);
        if (i < vidas) {
            img.classList.remove("perdida");
        } else {
            img.classList.add("perdida");
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

        ctx.fillStyle = "#a0a0c0";
        ctx.fill();

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

    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 2;

    ctx.shadowColor = "#D4AF37";
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.moveTo(0, -tamanio);
    ctx.lineTo(tamanio * 1.2, tamanio);
    ctx.lineTo(0, tamanio * 0.5);
    ctx.lineTo(-tamanio * 1.2, tamanio);
    ctx.closePath();
    ctx.fillStyle = nave.color;
    ctx.fill();
    ctx.stroke();

    if (simboloNave.complete) {
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 100;
        ctx.drawImage(
            simboloNave,
            -tamanio * 0.5,
            -tamanio * 0.6,
            tamanio * 1.0,
            tamanio * 1.0
        );
        ctx.shadowBlur = 0;
    }

    if (teclas.w){
        ctx.beginPath();
        ctx.strokeStyle = "#ffae00";
        ctx.lineWidth = 3;

        ctx.moveTo(-tamanio * 0.3, tamanio);
        ctx.lineTo(0, tamanio + Math.random() * 20 + 10);
        ctx.lineTo(tamanio * 0.3, tamanio);

        ctx.stroke();
    }

    if (teclas.s){
        ctx.beginPath();
        ctx.strokeStyle = "#ffae00";
        ctx.lineWidth = 2;

        ctx.moveTo(-tamanio * 0.3, -tamanio * 0.5);
        ctx.lineTo(0, -tamanio - (Math.random() * 10 + 5));
        ctx.lineTo(tamanio * 0.3, -tamanio * 0.5);

        ctx.stroke();
    }
    ctx.restore();
}

inicializarVidas();

function juegoEnCurso() {
    if (vidas <= 0) {
        return;
    }

    ctx.fillStyle = "#000a27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    actualizar();

    actualizarAsteroides();

    verificarColisiones();

    dibujarNave(nave.x, nave.y, nave.tamanio, nave.angulo);

    dibujarAsteroides();

    actualizarVidasHTML();

    requestAnimationFrame(juegoEnCurso);
}

juegoEnCurso();