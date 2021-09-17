const path = require('path')
const fs = require('fs')

const pathAbsolute = __dirname;
const pathRelative = 'new_directory/inspectMe.md';
// console.log(path.isAbsolute(pathAbsolute)) // Retorna booleano
// console.log(path.parse(pathRelative))

// Transforma ruta absoluta a ruta relativa
if (path.isAbsolute(pathAbsolute)) {
    const pathConverted = path.resolve(pathAbsolute)
    console.log('La ruta convertida es:', pathConverted)
} else {
    console.log('La ruta no se puede convertir')
}

// Obtiene el contenido de un directorio
fs.readdir(pathAbsolute, 'utf-8', (err, files) => {
    if (err) {
        console.log('OCURRIÓ UN ERROR!', err)
    } else {
        console.log(files)
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
            console.log(data)
        }
    })
} else {
    console.log('Este no es un archivo markdown')
}

// Une rutas
const pathUnion = path.join(__dirname, 'hola', 'esta', 'es', 'una', 'fusión', '.txt');
console.log(pathUnion)