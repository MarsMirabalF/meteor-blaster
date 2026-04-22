const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const simboloNave = new Image();
simboloNave.src = "vista/icons/acbf.png";

canvas.width = 1500;
canvas.height = 550;

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

    if (teclas.w) {
        ctx.beginPath();
        ctx.strokeStyle = "#ffae00";
        ctx.lineWidth = 3;

        ctx.moveTo(-tamanio * 0.3, tamanio);
        ctx.lineTo(0, tamanio + Math.random() * 20 + 10);
        ctx.lineTo(tamanio * 0.3, tamanio);

        ctx.stroke();
    }

    if (teclas.s) {
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

function dibujarBalas() {
    for (const bala of balas) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(bala.x, bala.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#00d5ff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.restore();
    }
}

function actualizarYDibujarExplosiones() {
    for (let i = explosiones.length - 1; i >= 0; i--) {
        const exp = explosiones[i];
        let vivas = false;

        for (const p of exp.particulas) {
            p.x += p.velocidadX;
            p.y += p.velocidadY;
            p.vida -= 0.04;

            if (p.vida > 0) {
                vivas = true;
                ctx.save();
                ctx.globalAlpha = p.vida;
                ctx.fillStyle = "#ffae00";
                ctx.shadowColor = "#ff0000";
                ctx.shadowBlur = 100;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        if (!vivas) explosiones.splice(i, 1);
    }
}

function dibujarFondo() {
    ctx.fillStyle = "#000a27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarGameOver() {
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