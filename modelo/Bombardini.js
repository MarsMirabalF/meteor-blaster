const Bombardini = {
    x: 0,
    y: 0,
    tamanio: 25,
    color: "#000000",
    angulo: 0,
    velocidadX: 0,
    velocidadY: 0
};

function vuelaAlto(){
    if (invencible){
        return;
    }
    for(const ast of asteroides) {

        const dx =Bombardini.x-ast.x;
        const dy =Bombardini.y-ast.y ;

          const distancia = Math.sqrt(dx*dx + dy*dy);
          const radioColision = ast.radio* 0.85;

        if (distancia< Bombardini.tamanio +radioColision){
            vidas--;
            if (vidas <= 0){

                perdisteJAJAJA() ;
            }else{

                renacerBombardini();
            }
            break ;
        }
    }
}

function renacerBombardini( ) {

     Bombardini.x= pantallaJ.width /2;

     Bombardini.y=pantallaJ.height/2 ;

      Bombardini.velocidadX = 0;

      Bombardini.velocidadY=0;

      Bombardini.angulo=0;
        invencible=true;

        tiempoInvencible =efectoEstrella ;
}


function quePasoBombardini(){
  
    if (controlesGamerXD.a){

      Bombardini.angulo -= 0.05;
    }
    if (controlesGamerXD.d){
      Bombardini.angulo += 0.05;
    }

    if (controlesGamerXD.w) {
      Bombardini.velocidadX += Math.sin(Bombardini.angulo)* 0.2;

       Bombardini.velocidadY-= Math.cos(Bombardini.angulo) *0.2;
    }
    if (controlesGamerXD.s){
      Bombardini.velocidadX-=Math.sin(Bombardini.angulo)* 0.2;

      Bombardini.velocidadY+=Math.cos(Bombardini.angulo)* 0.2;
    }

      Bombardini.x += Bombardini.velocidadX;

    Bombardini.y+= Bombardini.velocidadY;

       Bombardini.velocidadX *= 0.98;
    Bombardini.velocidadY *= 0.98;

    if (Bombardini.x >pantallaJ.width){
         Bombardini.x =0; 
        }
    if (Bombardini.x <0) {
         Bombardini.x = pantallaJ.width; 
        }
    if (Bombardini.y>pantallaJ.height) {

         Bombardini.y = 0 ;  
        }
    if (Bombardini.y<0) {

         Bombardini.y= pantallaJ.height; }

    if (invencible) {

      tiempoInvencible--;

        if (tiempoInvencible<= 0) {

          invencible= false;

        }
    }

    if(cooldownDisparo>0){
        cooldownDisparo-- ;
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