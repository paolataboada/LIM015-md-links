const fs = require('fs');

// Lista archivos de un directorio
fs.readdir('./src', (err, files) => {
    if (err) {
        console.log(err)
    } else {
        console.log(files)
    }
})

// Lee un archivo e imprime su contenido en string
fs.readFile('./src/example.md', 'utf-8', (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});