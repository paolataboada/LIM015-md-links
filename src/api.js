const path = require('path')
const fs = require('fs')

// Rutas de ejemplo
const dir = 'src/new_directory'
const file = 'src/new_directory/inspectMe.md'
const dif = 'src/new_directory/cheat.txt'

// Comprueba si la ruta existe
const pathExists = (dirExample) => fs.existsSync(dirExample) // retorna boolean
// console.log(pathExists(file));

// Transforma ruta relativa a ruta absoluta
const convertPath = (dirExample) => path.resolve(dirExample) // retorna ruta absoluta
// console.log(convertPath('src/new_directory'))

// Lee el archivo
const readFile = (fileExample) => fs.readFileSync(fileExample, 'utf-8') // retorna contenido del archivo
// console.log(readFile(file))

// Obtiene el contenido de un directorio
const readDir = (dirExample) => fs.readdirSync(dirExample, 'utf-8') // retorna array
// console.log(readDir(dir));

// Averigua si es archivo o carpeta
// const hasExtension = (fileExample) => {
//     if (path.parse(fileExample).ext === '.md') {
//         return true  // retorna true si es archivo md
//     } else {
//         // if (path.parse(fileExample).ext === '') {
//             return false // retorna false si es directorio u otro tipo de archivo
//         // } else {
//         //     return 'Por el momento solo revisamos archivos Markdown 😅' // u otro tipo de archivo
//         // }
//     }
// }
// console.log(hasExtension('src/new_directory/for-test.txt'))

// Averigua si es archivo o carpeta
const hasExtension = (fileExample) => {
    if (path.parse(fileExample).ext !== '') {
        const typeFile = path.parse(fileExample).ext;
        return typeFile  // retorna el tipo de archivo que es (md, jpeg, txt, etc.)
    } else {
        return false // retorna false si es un directorio
    }
}
// console.log(hasExtension('src/new_directory/for-test.txt'))

// Une dos pedazos de ruta
const joinPath = (first, last) => path.join(first, last) // retorna path unido
// console.log(joinPath('src/new_directory', 'toRead.md'))

// Expresión regular para validar una url
const regExp = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g
const contentFile = readFile(file)
// Encuentra los links dentro del archivo
const findLinks = (contentExample) => {
    const patternLink = contentExample.match(regExp);
    const arrayLinks = patternLink;
    // console.log(`Este es un array con ${arrayLinks.length} links:`, arrayLinks);
    return arrayLinks // retorna un array de links
}
// console.log(findLinks(contentFile));

module.exports = {
    pathExists,
    convertPath,
    readFile,
    readDir,
    hasExtension,
    joinPath,
    findLinks
}