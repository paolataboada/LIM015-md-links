const path = require('path')
const fs = require('fs')

const pathAbsolute = 'C:/Users/TACNA/Documents/GitHub/LIM015-md-links/src'
const pathRelative = 'src/example.md'

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
fs.readdir(pathAbsolute, 'utf-8', (err, file) => {
    if (err) {
        console.log(err)
    } else {
        console.log(file)
    }
})

// Averigua si la extensión es markdown
const extension = path.parse(pathRelative).ext
if (extension === '.md') {
    // Lee el archivo markdown
    fs.readFile(pathRelative, 'utf-8', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data)
        }
    })
} else {
    console.log('Este no es un archivo markdown')
}
