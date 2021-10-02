const path = require('path')
const fs = require('fs')

// Rutas de ejemplo
const dir = 'src/new_directory'
const file = 'src/new_directory/inspectMe.md'
const dif = 'src/new_directory/cheat.txt'

// Comprueba si la ruta existe
const pathExists = (dirExample) => fs.existsSync(dirExample) // retorna boolean

// Pregunta si es una ruta absoluta
const isAbsolute = (dirExample) => path.isAbsolute(dirExample) // retorna boolean

// Transforma ruta relativa a ruta absoluta
const convertPath = (dirExample) => isAbsolute(dirExample) ? dirExample : path.resolve(dirExample)

// Lee el archivo
const readFile = (fileExample) => fs.readFileSync(fileExample, 'utf-8') // retorna contenido del archivo

// Obtiene el contenido de un directorio
const readDir = (dirExample) => fs.readdirSync(dirExample, 'utf-8') // retorna array

// Averigua si es archivo o carpeta
const hasExtension = (fileExample) => {
    if (path.parse(fileExample).ext !== '') {
        const typeFile = path.parse(fileExample).ext;
        return typeFile  // retorna el tipo de archivo que es (md, jpeg, txt, etc.)
    } else {
        return false // retorna false si es un directorio
    }
}
// console.log(path.parse('src/new_directory/toRead.md').base);

// Une dos pedazos de ruta
const joinPath = (first, last) => path.join(first, last) // retorna path unido
// console.log(joinPath('src/new_directory', 'toRead.md'))

// Expresión regular para validar una url
const regExp = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g
const contentFile = readFile('src/new_directory/toRead.md')
// Encuentra los links dentro del archivo
const findLinks = (contentExample) => {
    const patternLink = contentExample.match(regExp);
    const arrayLinks = patternLink;
    if (!arrayLinks) {
        return 'No se encontraron links en el archivo' // caso: sin coincidencias
    }
    return arrayLinks // retorna un array de links
}
// console.log(findLinks(contentFile));

module.exports = {
    pathExists,
    isAbsolute,
    convertPath,
    readFile,
    readDir,
    hasExtension,
    joinPath,
    findLinks
}

// console.log(65, process.cwd()); // will give you the current working directory.
// console.log(66, __dirname); // return the path of the folder where the current JavaScript file resides.
// console.log(67, __filename);