const teclas = {
    a: false,
    d: false,
    w: false,
    s: false,
    " ": false
};

document.addEventListener("keydown", (e) => {
    const tecla = e.key.toLowerCase();
    if (tecla in teclas) {
        teclas[tecla] = true;
    }
    if (e.key == " ") {
        e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    const tecla = e.key.toLowerCase();
    if (tecla in teclas) {
        teclas[tecla] = false;
    }
});