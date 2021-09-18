const path = require('path')
const fs = require('fs')

const pathAbsolute = __dirname;
const pathRelative = 'src/new_directory/inspectMe.md';

// Transforma ruta relativa a ruta absoluta
if (!path.isAbsolute(pathRelative)) {
    const pathConverted = path.resolve(pathRelative)
    console.log('Se transformó a ruta absoluta:', pathConverted)
} else {
    console.log('Esta ya es una ruta absoluta:', pathRelative)
}

// Obtiene el contenido de un directorio
fs.readdir(pathAbsolute, 'utf-8', (err, files) => {
    if (err) {
        console.log('OCURRIÓ UN ERROR!', err)
    } else {
        // console.log(files)
    }
})

// Averigua si la extensión es markdown
const extension = path.parse(pathRelative).ext
if (extension === '.md') {
    // Lee el archivo markdown
    fs.readFile(pathRelative, 'utf-8', (err, data) => {
        if (err) {
            console.log('OH NO! HA SUCEDIDO!', err)
        } else {
            // console.log(data)
        }
    })
} else {
    console.log('Este no es un archivo markdown')
}

// Une rutas
const pathUnion = path.join(__dirname, 'hola', 'esta', 'es', 'una', 'fusión', '.txt');
// console.log(pathUnion)