const pantallaJ = document.getElementById("canvasJuego");
const ctx = pantallaJ.getContext("2d");
const simboloNave = new Image();
simboloNave.src = "imagencitas/acbf.png";

pantallaJ.width = 1500;
pantallaJ.height = 550;

let vidas = 3;
let invencible = false;
let tiempoInvencible = 0;
const DURACION_INVENCIBLE = 180;

const Bombardini = {
    x: pantallaJ.width / 2,
    y: pantallaJ.height / 2,
    tamanio: 25,
    color: "#000000",
    angulo: 0,
    velocidadX: 0,
    velocidadY: 0
};

const balas = [];
const explosiones = [];
const VELOCIDAD_BALA = 5;
const VIDA_BALA = 300;
let cooldownDisparo = 0;
const COOLDOWN_DISPARO = 15;

const controlesGamerXD = {
    a: false,
    d: false,
    w: false,
    s: false,
    " ": false
};

document.addEventListener("keydown", (e) => {
    if (e.key in controlesGamerXD){
        controlesGamerXD[e.key] = true;
    };
    if (e.key == " "){
        e.preventDefault();
    };
});

document.addEventListener("keyup", (e) => {
    if (e.key in controlesGamerXD){ 
        controlesGamerXD[e.key] = false;
    }
});

function respawnNave() {
    Bombardini.x = pantallaJ.width / 2;
    Bombardini.y = pantallaJ.height / 2;
    Bombardini.velocidadX = 0;
    Bombardini.velocidadY = 0;
    Bombardini.angulo = 0;
    invencible = true;
    tiempoInvencible = DURACION_INVENCIBLE;
}

function actualizar() {
    if (controlesGamerXD.a) {
        Bombardini.angulo -= 0.05;
    }
    if (controlesGamerXD.d) {
        Bombardini.angulo += 0.05;
    }
    if (controlesGamerXD.w) {
        Bombardini.velocidadX += Math.sin(Bombardini.angulo) * 0.2;
        Bombardini.velocidadY -= Math.cos(Bombardini.angulo) * 0.2;
    }
    if (controlesGamerXD.s) {
        Bombardini.velocidadX -= Math.sin(Bombardini.angulo) * 0.2;
        Bombardini.velocidadY += Math.cos(Bombardini.angulo) * 0.2;
    }

    Bombardini.x += Bombardini.velocidadX;
    Bombardini.y += Bombardini.velocidadY;

    Bombardini.velocidadX *= 0.98;
    Bombardini.velocidadY *= 0.98;

    if (Bombardini.x > pantallaJ.width){ 
        Bombardini.x = 0; 
    }
    if (Bombardini.x < 0){ 
        Bombardini.x = pantallaJ.width; 
    }
    if (Bombardini.y > pantallaJ.height){ 
        Bombardini.y = 0; 
    }
    if (Bombardini.y < 0){ 
        Bombardini.y = pantallaJ.height; 
    }

    if (invencible) {
        tiempoInvencible--;
    if (tiempoInvencible <= 0) {
        invencible = false;
        }
    }

    if (cooldownDisparo > 0){ 
        cooldownDisparo--; 
    }

    if (controlesGamerXD[" "] && cooldownDisparo === 0) {
        balas.push({
            x: Bombardini.x + Math.sin(Bombardini.angulo) * Bombardini.tamanio,
            y: Bombardini.y - Math.cos(Bombardini.angulo) * Bombardini.tamanio,
            velocidadX: Math.sin(Bombardini.angulo) * VELOCIDAD_BALA + Bombardini.velocidadX,
            velocidadY: -Math.cos(Bombardini.angulo) * VELOCIDAD_BALA + Bombardini.velocidadY,
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
            balas[i].x < 0 || balas[i].x > pantallaJ.width ||
            balas[i].y < 0 || balas[i].y > pantallaJ.height
        ) {
            balas.splice(i, 1);
        }
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

const CANTIDAD_ASTEROIDES = 8;

function crearAsteroide(x, y, radio, velocidadX, velocidadY) {
    radio = radio || (45 + Math.random() * 30);
    x = x !== undefined ? x : Math.random() * pantallaJ.width;
    y = y !== undefined ? y : Math.random() * pantallaJ.height;

    velocidadX = velocidadX !== undefined ? velocidadX : (Math.random() - 0.5) * 1.5;
    velocidadY = velocidadY !== undefined ? velocidadY : (Math.random() - 0.5) * 1.5;

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

        if (ast.x > pantallaJ.width + ast.radio){
            ast.x = -ast.radio;
        }
        if (ast.x < -ast.radio){           
            ast.x = pantallaJ.width + ast.radio;
        }
        if (ast.y > pantallaJ.height + ast.radio){
            ast.y = -ast.radio;
        }
        if (ast.y < -ast.radio){         
            ast.y = pantallaJ.height + ast.radio;
        }
    }
}

function crearExplosion(x, y) {
    const particulas = [];
    const cantidad = 8;
    for (let i = 0; i < cantidad; i++) {
        const angulo = (i / cantidad) * Math.PI * 2;
        const velocidad = 1 + Math.random() * 2;
        particulas.push({
            x, y,
            velocidadX: Math.cos(angulo) * velocidad,
            velocidadY: Math.sin(angulo) * velocidad,
            vida: 1.0
        });
    }
    explosiones.push({ particulas });
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

function pantallaDalasxd() {
    vidas = 0;
    ctx.fillStyle = "#000a27";
    ctx.fillRect(0, 0, pantallaJ.width, pantallaJ.height);

    ctx.fillStyle = "#ff4444";
    ctx.font = "bold 64px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("Perdiste... :(", pantallaJ.width / 2, pantallaJ.height / 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px 'Courier New'";
    ctx.fillText("Recarga la página para reiniciar", pantallaJ.width / 2, pantallaJ.height / 2 + 60);
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
                perdisteJAJAJA();
            } else {
                respawnNave();
            }
            break;
        }
    }
}

const RADIO_MINIMO_ASTEROIDE = 20;

function verificarColisionesBalas() {
    for (let i = balas.length - 1; i >= 0; i--) {
        for (let j = asteroides.length - 1; j >= 0; j--) {
            const dx = balas[i].x - asteroides[j].x;
            const dy = balas[i].y - asteroides[j].y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < asteroides[j].radio) {
                const ast = asteroides[j];

                if (ast.radio > RADIO_MINIMO_ASTEROIDE * 2) {
                    const radioFragmento = ast.radio * 0.6;
                    const angulo1 = Math.random() * Math.PI * 2;
                    const angulo2 = angulo1 + Math.PI + (Math.random() - 0.5);
                    const speed = 1.5 + Math.random();

                    asteroides.push(crearAsteroide(
                        ast.x, ast.y, radioFragmento,
                        Math.cos(angulo1) * speed,
                        Math.sin(angulo1) * speed
                    ));
                    asteroides.push(crearAsteroide(
                        ast.x, ast.y, radioFragmento,
                        Math.cos(angulo2) * speed,
                        Math.sin(angulo2) * speed
                    ));
                }

                crearExplosion(ast.x, ast.y);
                asteroides.splice(j, 1);
                balas.splice(i, 1);

                if (asteroides.length === 0) {
                    nuevaOla();
                }
                break;
            }
        }
    }
}

let ola = 1;

function nuevaOla() {
    ola++;
    const cantidad = CANTIDAD_ASTEROIDES + ola;
    for (let i = 0; i < cantidad; i++) {
        asteroides.push(crearAsteroide());
    }
}

function crearLifes(){
  const viditas= document.getElementById("viditasDiv");
  viditas.innerHTML = "";

    for (let i=0; i<3; i++) {
        const corazoncito= document.createElement("img");
           corazoncito.src= "vista/iconitos/vida.png" ;
          corazoncito.id =`vida-${i}`;
          viditas.appendChild(corazoncito);
    }
}

function vidasResponsiveMorir( ){
    for (let i=0; i<3; i++) {
        const corazoncito= document.getElementById(`vida-${i}`);
        if(i<vidas){
          corazoncito.classList.remove("perdida") ;
        }else{
          corazoncito.classList.add("perdida");
        }
    }
}

function dibujarAsteroides() {
    for (const ast of asteroides) {
        ctx.save();
        ctx.translate(ast.x, ast.y);

        ctx.beginPath();
        ctx.moveTo(ast.vertices[0].x, ast.vertices[0].y);

        //La siguiente parte del codigo creada con una IA generativa o.o
        //:D se uso para el diseño que luego feu cambiado por uno personalizado
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

    //La siguiente parte del codigo es sacada de IA claude :O
    //se uso solo para el diseño que al inicio fue solamente
    //un triangulo luego se le agrego el simbolo de la nave 
    //con imagen y la linea entre la nave 
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

    if (controlesGamerXD.w){
        ctx.beginPath();
        ctx.strokeStyle = "#ffae00";
        ctx.lineWidth = 3;

        ctx.moveTo(-tamanio * 0.3, tamanio);
        ctx.lineTo(0, tamanio + Math.random() * 20 + 10);
        ctx.lineTo(tamanio * 0.3, tamanio);

        ctx.stroke();
    }

    if (controlesGamerXD.s){
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

crearLifes();

function juegoEnCurso() {
    if (vidas <= 0) {
        return;
    }

    ctx.fillStyle = "#000a27";
    ctx.fillRect(0, 0, pantallaJ.width, pantallaJ.height);

    actualizar();

    actualizarAsteroides();

    actualizarYDibujarExplosiones();

    actualizarBalas();

    verificarColisiones();

    verificarColisionesBalas();

    vidasResponsiveMorir();

    dibujarNave(Bombardini.x, Bombardini.y, Bombardini.tamanio, Bombardini.angulo);

    dibujarAsteroides();

    dibujarBalas();

    requestAnimationFrame(juegoEnCurso);
}

juegoEnCurso();