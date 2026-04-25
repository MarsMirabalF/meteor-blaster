let vidas = 3;
let invencible = false;
let tiempoInvencible = 0;
const DURACION_INVENCIBLE = 180;

function respawnNave( ) {
     Bombardini.x = pantallaJ.width / 2;
     Bombardini.y = pantallaJ.height / 2;
      Bombardini.velocidadX = 0;
      Bombardini.velocidadY = 0;
      Bombardini.angulo = 0;
        invencible = true;
        tiempoInvencible = DURACION_INVENCIBLE;
}

function perdisteJAJAJA(){
    vidas = 0;
      pantallaDalasxd();
}

function actualizar(){
    if (controlesGamerXD.a){
      Bombardini.angulo -= 0.05;
    }
    if (controlesGamerXD.d){
      Bombardini.angulo += 0.05;
    }
    if (controlesGamerXD.w) {
      Bombardini.velocidadX += Math.sin(Bombardini.angulo) * 0.2;
      Bombardini.velocidadY -= Math.cos(Bombardini.angulo) * 0.2;
    }
    if (controlesGamerXD.s){
      Bombardini.velocidadX -= Math.sin(Bombardini.angulo) * 0.2;
      Bombardini.velocidadY += Math.cos(Bombardini.angulo) * 0.2;
    }

      Bombardini.x += Bombardini.velocidadX;
    Bombardini.y+= Bombardini.velocidadY;

       Bombardini.velocidadX *= 0.98;
    Bombardini.velocidadY *= 0.98;

    if (Bombardini.x > pantallaJ.width){
         Bombardini.x = 0; 
        }
    if (Bombardini.x < 0) {
         Bombardini.x = pantallaJ.width; 
        }
    if (Bombardini.y > pantallaJ.height) {
         Bombardini.y = 0; 
        }
    if (Bombardini.y < 0) {
         Bombardini.y = pantallaJ.height; }

    if (invencible) {
      tiempoInvencible--;
        if (tiempoInvencible <= 0) {
          invencible = false;
        }
    }

    if(cooldownDisparo>0){
        cooldownDisparo--;
    }

    if(controlesGamerXD[" "]&&cooldownDisparo === 0){
        balas.push({
          x: Bombardini.x +Math.sin(Bombardini.angulo)*Bombardini.tamanio,
          y: Bombardini.y- Math.cos(Bombardini.angulo)*Bombardini.tamanio,
          velocidadX: Math.sin(Bombardini.angulo) *VELOCIDAD_BALA + Bombardini.velocidadX,
            velocidadY: -Math.cos(Bombardini.angulo) *VELOCIDAD_BALA + Bombardini.velocidadY,
            vida: VIDA_BALA
        });
          cooldownDisparo = COOLDOWN_DISPARO;
    }
}

function actualizarBalas() {
    for (let i=balas.length-1; i>=0; i--) {
        balas[i].x+=balas[i].velocidadX;
        balas[i].y +=balas[i].velocidadY;
        balas[i].vida--;
        if (
          balas[i].vida<=0||
           balas[i].x < 0|| balas[i].x > pantallaJ.width ||
            balas[i].y < 0||balas[i].y > pantallaJ.height
        ) {
             balas.splice(i, 1);
        }
    }
}

function actualizarAsteroides( ){
    for (const ast of asteroides){
        ast.x+=ast.velocidadX;
        ast.y+= ast.velocidadY ;

        if (ast.x > pantallaJ.width + ast.radio) { 
              ast.x = -ast.radio; 
        }
        if (ast.x < -ast.radio) { 
             ast.x = pantallaJ.width + ast.radio; 
        }
        if (ast.y > pantallaJ.height + ast.radio) { 
              ast.y = -ast.radio; 
        }
        if (ast.y < -ast.radio) { 
             ast.y = pantallaJ.height + ast.radio; 
        }
    }
}

function iniciarJuego( ){
    Bombardini.x = pantallaJ.width /2;
    Bombardini.y= pantallaJ.height/ 2;

    for (let i=0; i<CANTIDAD_ASTEROIDES; i++) {
        asteroides.push(crearAsteroide());
    }

    crearLifes();
    juegoEnCurso();
}

function juegoEnCurso( ){
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
    vidasResponsiveMorir();
    dibujarNave(Bombardini.x, Bombardini.y, Bombardini.tamanio, Bombardini.angulo);
    dibujarAsteroides();
    dibujarBalas();

    requestAnimationFrame(juegoEnCurso);
}

iniciarJuego();