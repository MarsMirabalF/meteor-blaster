function inicializarVidas() {
    const contenedor = document.getElementById("contenedorVidas");
    contenedor.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = "icons/vida.png";
        img.id = `vida-${i}`;
        contenedor.appendChild(img);
    }
}

function actualizarVidasHTML() {
    for (let i = 0; i < 3; i++) {
        const img = document.getElementById(`vida-${i}`);
        if (i < vidas) {
            img.classList.remove("perdida");
        } else {
            img.classList.add("perdida");
        }
    }
}