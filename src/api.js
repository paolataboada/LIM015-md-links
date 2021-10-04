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

// Une dos pedazos de ruta
const joinPath = (first, last) => path.join(first, last)

/* -------------------------------------- API -------------------------------------- */

// Obtiene array de rutas absolutas de archivos md
const getFilesMd = (path) => {
    if (pathExists(path)) {
        const absolutePath = convertPath(path)
        const dirOrFile = hasExtension(absolutePath) // retorna ext = file, false = directory
            if (dirOrFile) { // ext de file - Obs: Puede ser md, txt, jpeg, png, etc.
                if (dirOrFile === '.md') {
                    return [absolutePath]
                } else {
                    return [] // 'Este no es un archivo markdown'
                }
            } else { // dir - Obs: Puede contener files o subdirectorios
                const contentDir = readDir(absolutePath) // retorna un array x c/d
                let arrayFiles = [];
                contentDir.forEach((file) => {
                    const unionPath = joinPath(absolutePath, file)
                    const recurMainFunction = getFilesMd(unionPath)
                    arrayFiles = arrayFiles.concat(recurMainFunction)
                })
                return arrayFiles
            }
    } else {
        return 'Ruta inexistente'
    }
}
console.log('directorio:', getFilesMd(dir))
// console.log('archivoMD_1:', getFilesMd(file))
// console.log('archivoTXT:', getFilesMd(dif))

// Expresión regular para validar una url
const regExpLink = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g
const regExpText = /\[([\w\s\d\-+&#/\.]+)\]/g
const fullRegExp = /\[(.+?)\]\((https?.+?)\)/g

const readFilesMd = (path) => {  // TODO: Revisar función getFilesMd() porque no lee archivo deep.md
    const arrayLinks = [];
    const propertiesLinks = {}
    getFilesMd(path).forEach((md) => { 
        const contentFile = readFile(md);
        const fullLinks = contentFile.match(fullRegExp)
        if (fullLinks) {
            console.log(80, fullLinks);
            fullLinks.forEach((link) => {
                const href = link.match(regExpLink).join();
                const text = link.match(regExpText).join().slice(1, -1);
                // text = text.substr(1, text.length-2)
                const propertiesLinks = {
                    href,
                    text,
                    file: path
                };
                arrayLinks.push(propertiesLinks)
            });
            return arrayLinks
        } else { // caso: null
            return 'No hay links en el archivo'
        }
    })
    return arrayLinks
}
// console.log(readFilesMd(dir));

module.exports = {
    pathExists,
    isAbsolute,
    convertPath,
    readFile,
    readDir,
    hasExtension,
    joinPath
}

// console.log(65, process.cwd()); // will give you the current working directory.
// console.log(66, __dirname); // return the path of the folder where the current JavaScript file resides.
// console.log(67, __filename);