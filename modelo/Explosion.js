const explosiones = [] ;

//palabra japones para explosiones de naruto que me gusta 
function katsu(x, y){

     const particulas = [ ];

      const cantidad = 8;

    for (let i = 0; i < cantidad; i++){

        //la formula de codigo de abajo es para que las particulas se dispersen en todas direcciones
        //y con velocidades aleatorias la formula fue sacada de una respuesta de la ia claude 
         const angulo = (i/cantidad) *Math.PI *2;
         const velocidad = 1+Math.random( ) *2;


        particulas.push({

          x,y,
           velocidadX: Math.cos(angulo)*velocidad,
            velocidadY: Math.sin(angulo)*velocidad,

         vida: 1.0
        });
    }
     explosiones.push({ particulas });
}