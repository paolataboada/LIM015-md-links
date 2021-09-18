const path = require('path')
const fs = require('fs')

// Rutas de ejemplo
const dir = 'src/new_directory'
const file = 'src/new_directory/inspectMe.md'

// Comprueba si la ruta existe
const pathExists = (dirExample) => {
    if (fs.existsSync(dirExample)) { // retorna booleano
        console.log('Esta ruta existe:', dirExample);
    } else {
        console.log(`La ruta '${dirExample}' no existe.`)
    }
}
pathExists(dir)

// Transforma ruta relativa a ruta absoluta
const convertPath = (dirExample) => {
    if (!path.isAbsolute(dirExample)) {
        const pathConverted = path.resolve(dirExample)
        console.log('Se transformó a ruta absoluta:', pathConverted)
    } else {
        console.log('Esta ya es una ruta absoluta:', pathExample)
    }
}
convertPath(dir)

// Averigua si es archivo o carpeta
const hasExtension = (fileExample) => {
    if (path.parse(fileExample).ext === '.md') {
        console.log(path.parse(fileExample).ext);
    } else {
        console.log('Este no es un archivo md, se asume que es carpeta u otro tipo de archivo')
        if (path.parse(fileExample)) {
            console.log('Archivo excluido')
        } else {
            console.log('Leer directorio')
        }
    }
}
hasExtension(file)

// Lee el archivo markdown
const readFile = (fileExample) => {
    fs.readFile(fileExample, 'utf-8', (err, data) => {
        if (err) {
            console.log('OH NO! HA SUCEDIDO!', err)
        } else {
            console.log(data)
        }
    })
}
readFile(file) 

// Obtiene el contenido de un directorio
const readDir = (dirExample) => {
    fs.readdir(dirExample, (err, files) => {
        if (err) {
            console.log(err)
        } else {
            console.log(files)
        }
    })
}
readDir(dir)