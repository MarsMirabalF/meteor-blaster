# meteor-blaster
Proyecto para programacion web, sobre un juego de de asteroides retro basado en el juego de atari.

A continuacion se listaran sitios web de referencia:

SITIOS WEB:

Sitio web parecido a W3 schools pero para la API de canvas: 
https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial
    -Se uso para averiguar funciones especificas como : canvas.getContext("2d");

Sitio web de donde se utilizo para aprender a manejar que valores tienen las teclas:
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    -Se uso para: if (e.key in teclas) teclas[e.key] = true;

Sitio web para saber como escuchar eventos: 
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    -Se uso para : document.addEventListener("keydown", (e) =>

Sitio web para aprender de animacion y el bucle del juego: 
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    -Se uso para requestAnimationFrame(juegoEnCurso);

Sitio web de donde se uso para aprender de rotaciones, translaciones y transformaciones:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations
    -Se uso la siguiente formula matematica para generar poligonos irregulares: 
    distancia = radio * (0.7 + Math.random() * 0.3) 
    -Implementado tanto para los asteroides como para la nave: ctx.translate(ast.x, ast.y);

Sitio web para dibujar:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    -Se uso para: beginPath(), moveTo(), lineTo(), fill() vs stroke()

Sitio web para usar imagenes:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    -Se uso para: simboloNave
    -Se uso para colocar la vida como imagen en el html dandole estilo en el css. Y la imagen se carga desde Juego.js
    -Se uso para aplicar filtros a la imagen con css.

Sitio web de donde saber como usar blur y sombras:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur
    -Se uso para: ctx.shadowBlur y ctx.shadowColor

Sitio para ver las coliciones:
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    -Se uso para Circle collision detection

Sitio para ver las coliciones:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
    -Se uso para determinar el globalAlpha

Sitio para dibujos con arco en canvas:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    -arc() - Para dibujar balas circulares

Sitio para rellenar las figuras en canva:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
    -fill() - Para rellenar las balas con color

Sitio para saber como trazar un camino o linea de dibujo:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
    -beginPath() - Para iniciar el trazado de cada bala

Sitio para guardar el estado del canvas:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
    - save() - Para guardar el estado antes de cambiar globalAlpha

Sitio para restaurar el estado del canvas:
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
    - restore() - Para restaurar el estado después de dibujar cada partícula
  
Sitio para funciones trigonométricas en JavaScript:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
    - Math.cos() - Para calcular la dirección X de cada partícula según su ángulo

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
    - Math.sin() - Para calcular la dirección Y de cada partícula según su ángulo

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
    - Math.PI - Para distribuir las partículas en 360 grados (Math.PI * 2)

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    - Math.random() - Para variar la velocidad de cada partícula aleatoriamente

Sitio para el método splice en arrays:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    - splice() - Para eliminar explosiones y partículas que ya terminaron su ciclo de vida

TUTORIALES DE YOUTUBE:

Tutorial de como hacer el juego Space Invaders para dibujar la nave y ahora el movimiento con las teclas:
https://youtu.be/v74X5dtDLvg?si=ofvZAOHHB9Zcrko2

Tutorial para entender que estamos haciendo:
https://www.youtube.com/watch?v=NYeLT2IoJ5k&t=964s

Tutorial para crear la nave si bien no se uso completamente el tutorial de aqui, si se aprende conceptos muy interesantes hacer del uso de ctx:
https://www.youtube.com/watch?v=pTzeBsHQeo0&t=990s

Tutorial de como hacer el juego de asteroides para el movimiento de la nave y los asteroides:
https://www.youtube.com/watch?v=ChkCQ6fCGoY

Tutorial de como hacer el juego de asteroides la parte de las colisiones y creaar los asteroides:
https://youtu.be/ayT3uRUmhLk?si=Y0zfu07Dc-L0rkAR

Tutorial de como hacer el juego de asteroides la parte de los disparos y efecto de colisiones para las balas:
https://www.youtube.com/watch?v=PIKm4rWqpdw&list=PL4cUxeGkcC9iO8ai6LU0s6aHAaWP4RAkF&index=6

Tutorial de como hacer la parte de gameover para el juego:
https://www.youtube.com/watch?v=9jxkWxCHuq0&list=PL4cUxeGkcC9iO8ai6LU0s6aHAaWP4RAkF&index=8


Comentarios sobre el proyecto:

Sobre el archivo: "Verificar.js"

Puede ver que ese archivo mantiene los cambios constantes a lo largo del tiempo lo mantuve
para que usted sea consiente que no se usaron proyectos de terceros o generacion de codigo,
asi usted ve los cambios de a poco.

Sobre mi penultimo commit: 
Me equivoque de nombre deberia decir que fue el que commit que use para refactorizar algunos
ultimos detalles del MVC.