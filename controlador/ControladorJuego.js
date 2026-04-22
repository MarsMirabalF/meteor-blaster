let vidas = 3;
let invencible = false;
let tiempoInvencible = 0;
const DURACION_INVENCIBLE = 180;

function respawnNave() {
    nave.x = canvas.width / 2;
    nave.y = canvas.height / 2;
    nave.velocidadX = 0;
    nave.velocidadY = 0;
    nave.angulo = 0;
    invencible = true;
    tiempoInvencible = DURACION_INVENCIBLE;
}

function gameOver() {
    vidas = 0;
    dibujarGameOver();
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

    if (nave.x > canvas.width) { nave.x = 0; }
    if (nave.x < 0) { nave.x = canvas.width; }
    if (nave.y > canvas.height) { nave.y = 0; }
    if (nave.y < 0) { nave.y = canvas.height; }

    if (invencible) {
        tiempoInvencible--;
        if (tiempoInvencible <= 0) {
            invencible = false;
        }
    }

    if (cooldownDisparo > 0) {
        cooldownDisparo--;
    }

    if (teclas[" "] && cooldownDisparo === 0) {
        balas.push({
            x: nave.x + Math.sin(nave.angulo) * nave.tamanio,
            y: nave.y - Math.cos(nave.angulo) * nave.tamanio,
            velocidadX: Math.sin(nave.angulo) * VELOCIDAD_BALA + nave.velocidadX,
            velocidadY: -Math.cos(nave.angulo) * VELOCIDAD_BALA + nave.velocidadY,
            vida: VIDA_BALA
        });
        cooldownDisparo = COOLDOWN_DISPARO;
    }
}

function actualizarBalas() {
    for (let i = balas.length - 1; i >= 0; i--) {
        balas[i].x += balas[i].velocidadX;
        balas[i].y += balas[i].velocidadY;
        balas[i].vida--;

        if (
            balas[i].vida <= 0 ||
            balas[i].x < 0 || balas[i].x > canvas.width ||
            balas[i].y < 0 || balas[i].y > canvas.height
        ) {
            balas.splice(i, 1);
        }
    }
}

function actualizarAsteroides() {
    for (const ast of asteroides) {
        ast.x += ast.velocidadX;
        ast.y += ast.velocidadY;

        if (ast.x > canvas.width + ast.radio) { ast.x = -ast.radio; }
        if (ast.x < -ast.radio) { ast.x = canvas.width + ast.radio; }
        if (ast.y > canvas.height + ast.radio) { ast.y = -ast.radio; }
        if (ast.y < -ast.radio) { ast.y = canvas.height + ast.radio; }
    }
}

function iniciarJuego() {
    nave.x = canvas.width / 2;
    nave.y = canvas.height / 2;

    for (let i = 0; i < CANTIDAD_ASTEROIDES; i++) {
        asteroides.push(crearAsteroide());
    }

    inicializarVidas();
    juegoEnCurso();
}

function juegoEnCurso() {
    if (vidas <= 0) {
        return;
    }

    dibujarFondo();
    actualizar();
    actualizarAsteroides();
    actualizarYDibujarExplosiones();
    actualizarBalas();
    verificarColisiones();
    verificarColisionesBalas();
    actualizarVidasHTML();
    dibujarNave(nave.x, nave.y, nave.tamanio, nave.angulo);
    dibujarAsteroides();
    dibujarBalas();

    requestAnimationFrame(juegoEnCurso);
}

iniciarJuego();