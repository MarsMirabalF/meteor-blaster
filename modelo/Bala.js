const balas = [];

const VELOCIDAD_BALA = 5;
const VIDA_BALA = 300;
let cooldownDisparo = 0;
const COOLDOWN_DISPARO = 15;

//esta funcion es muy parecida a lo que se uso en el turorial que deje en el readme
//esto porque a mi no se me ocurrio otra forma y vi que esta cumple todo lo que busco
//solo que cambie nombres y use la velocidad de dezlizamiento mia
function disparoVSPiedritas(){
    for (let i=balas.length -1 ; i>=0; i--){

        for (let j=asteroides.length-1 ; j>=0 ; j--) {

             const dx= balas[i].x-asteroides[j].x;
              const dy=balas[i].y-asteroides[j].y;

               const distancia = Math.sqrt(dx * dx + dy * dy) ;

            if (distancia<asteroides[j].radio){

                const ast = asteroides[j];
                if (ast.radio>RADIO_MINIMO_ASTEROIDE*2) {

                    const radioFragmento =ast.radio*0.6;

                      const angulo1= Math.random()*Math.PI*2;

                     const angulo2= angulo1+Math.PI+(Math.random()-0.5);
                      
                      const speed =1.5+Math.random() ;

                    asteroides.push(nacerPiedrita(
                        ast.x, ast.y, radioFragmento,
                         Math.cos(angulo1)*speed,
                        Math.sin(angulo1)*speed

                    ));
                    
                    asteroides.push(nacerPiedrita(
                          ast.x, ast.y, radioFragmento,
                         Math.cos(angulo2)*speed,
                          Math.sin(angulo2)*speed
                          
                    ));
                }

                 katsu(ast.x, ast.y);
                 asteroides.splice(j,1);
                 balas.splice(i,1) ;

                if(asteroides.length === 0){

                    invocarSiguienteRondaDeDolor() ;

                }
                 break;
            }
        }
    }
}

function balasQueSeFueronANuncaJamas() {
    for (let i=balas.length-1; i>=0; i--) {

        balas[i].x+=balas[i].velocidadX;

          balas[i].y +=balas[i].velocidadY ;

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