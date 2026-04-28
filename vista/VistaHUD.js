function crearLifes( ) {
    const vidasHay = document.getElementById("viditasDiv");
    vidasHay.innerHTML = "";

    for(let i=0; i<3; i++){
       const corazoncito= document.createElement("img");
      corazoncito.src="vista/imagencitas/vida.png" ;
        corazoncito.id =`vida-${i}` ;
        vidasHay.appendChild( corazoncito);
    }
}

function vidasResponsiveMorir(){
    for(let i=0; i<3; i++) {
      // Crei usar template string seria interesante usar para el id de las 3 iamgens
      // nose me dio curiosidad que me parecio usar esta forma 
      const corazoncito =document.getElementById(`vida-${i}`) ;
      if(i<vidas){ 
        corazoncito.classList.remove( "perdida") ;
      }else{
          corazoncito.classList.add("perdida" );
    }
    }
}