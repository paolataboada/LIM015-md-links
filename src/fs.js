const fs = require('fs');

// Comprueba si la ruta existe
const dir = './new_directory'
const file = 'new_directory/inspectMe.md'
fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
        throw ('Esta ruta no existe:', file)
    } else {
        console.log('Esta ruta existe:', file)
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
const string = `[GitHub Paola](https://github.com/paolataboada/LIM015-md-links)
                [Markdown](https://es.wikipedia.org/wiki/Markdown)
                [Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)`
const regExp = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g
const pattern = string.match(regExp);
// console.log('COINCIDENCIA(S):', pattern.length, pattern);

// Lee un archivo e imprime su contenido en string
fs.readFile(file, 'utf-8', (error, data) => {
    let arrayLinks;
    if (error) {
        console.log(error);
    } else {
        // console.log(data);
        const pattern_2nd = data.match(regExp);
        arrayLinks = (pattern_2nd);
        console.log(`Este es un array con ${arrayLinks.length} links:`, arrayLinks);
        // console.log(`SE ENCONTRARON ${pattern_2nd.length} COINCIDENCIAS: ${pattern_2nd}`);
    }
});
