const fs = require('fs');

// Comprueba si la ruta existe
const dir = './src'
const file = './src/example.md'
fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
        throw (file, 'Esta ruta no existe')
    } else {
        console.log(file, 'Esta ruta existe')
    }
});

// Lista archivos de un directorio
fs.readdir(dir, (err, files) => {
    if (err) {
        console.log(err)
    } else {
        // console.log(files)
    }
})

// Expresión regular para validar una url
const regExp = / https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2-256}\.[a-z]{2-6}\b([-a-zA-Z0-9@:%._\+~#()?&//=]*) /

// Lee un archivo e imprime su contenido en string
fs.readFile(file, 'utf-8', (error, data) => {
    if (error) {
        console.log(error);
    } else {
        // console.log(data);
    }
});
