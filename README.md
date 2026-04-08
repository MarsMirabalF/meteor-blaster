# meteor-blaster
Proyecto para programacion web, sobre un juego de de asteroides retro basado en el juego de atari.

A continuacion se listaran sitios web de referencia:

Siyio web parecido a W3 schools pero para la API de canvas: 
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

Tutorial de como hacer el juego Space Invaders:
https://youtu.be/v74X5dtDLvg?si=ofvZAOHHB9Zcrko2
    -De aqui por ahora se uso para dibujar la nave y ahora el movimiento con las teclas.