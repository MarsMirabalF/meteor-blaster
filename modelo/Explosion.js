const explosiones = [];

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