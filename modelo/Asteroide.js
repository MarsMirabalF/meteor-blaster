const asteroides = [];
const CANTIDAD_ASTEROIDES = 8;
const RADIO_MINIMO_ASTEROIDE = 20;
let ola = 1;

function crearAsteroide(x, y, radio, velocidadX, velocidadY) {
    const canvas = document.getElementById("canvasJuego");

    radio = radio || (45 + Math.random() * 30);
    x = x !== undefined ? x : Math.random() * canvas.width;
    y = y !== undefined ? y : Math.random() * canvas.height;

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

function nuevaOla() {
    ola++;
    const cantidad = CANTIDAD_ASTEROIDES + ola;
    for (let i = 0; i < cantidad; i++) {
        asteroides.push(crearAsteroide());
    }
}