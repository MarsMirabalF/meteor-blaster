const controlesGamerXD = {
        w: false,
    a: false, d: false,
        s: false,
                " ": false
};

document.addEventListener("keydown", (e) => {
    const teclitasGaming=e.key.toLowerCase();
    if(teclitasGaming in controlesGamerXD){
          controlesGamerXD[teclitasGaming] = true;
    }
    if(e.key == " ") {
      e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    const teclitasGaming =e.key.toLowerCase( );
    if(teclitasGaming in controlesGamerXD) {
      controlesGamerXD[teclitasGaming] = false;
    }
});