function verificarColisiones() {
    if (invencible) {
        return;
    }
    for (const ast of asteroides) {
        const dx = Bombardini.x - ast.x;
        const dy = Bombardini.y - ast.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        const radioColision = ast.radio * 0.85;

        if (distancia < Bombardini.tamanio + radioColision) {
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