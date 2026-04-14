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