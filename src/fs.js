const fs = require('fs');

/* fs.writeFile('./src/texto.txt', 'Escribiendo en el archivo creado :3', (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Archivo creado');
    }
}); */

fs.readFile('./src/texto.txt', (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data); // Devuelve buffer o texto crudo
        console.log(data.toString());
    }
});
