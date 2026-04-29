let vidas = 3;
let invencible = false;
let tiempoInvencible = 0 ;

const efectoEstrella = 180;

function perdisteJAJAJA(){
    vidas=0;

      pantallaDalasxd();
}

function invocarSiguienteRondaDeDolor( ){
      ola++;

      const cantidad = CANTIDAD_ASTEROIDES + ola;

    for (let i = 0; i < cantidad; i++){

      asteroides.push(nacerPiedrita());
    }
}

function daleJuguemos( ){
     Bombardini.x = pantallaJ.width /2;
      Bombardini.y= pantallaJ.height/ 2;

    for (let i=0; i<CANTIDAD_ASTEROIDES; i++) {

    asteroides.push(nacerPiedrita());
    }

    crearLifes();
      bucleInfinitoDeSufrimiento();
}

function bucleInfinitoDeSufrimiento( ){

    if (vidas <= 0) {
        return;
    }

    fondoEspacio();
    quePasoBombardini();
    piedritasFlotantes();
    pintaditaExplosiones();
    balasQueSeFueronANuncaJamas();
    vuelaAlto();
    disparoVSPiedritas();
    vidasResponsiveMorir();
    pintaditaBombardini(Bombardini.x, Bombardini.y, Bombardini.tamanio, Bombardini.angulo);
    pintaditaPiedritas();
    pintaditaBalas();

    requestAnimationFrame(bucleInfinitoDeSufrimiento);
}

daleJuguemos();