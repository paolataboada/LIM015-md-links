const api = require('./api.js')
const fetch = require('node-fetch')

const objOfPaths = {
    directory: 'src/new_directory',
    fileMd_1: 'src/new_directory/toRead.md',
    fileMd_2: 'src/new_directory/inspectMe.md',
    difFile: 'src/new_directory/cheat.txt',
    wrongPath: 'src/assets/flowchart.jpg',
    sub_FileMd: 'src/new_directory/sub_dir/sub_file.md'
}

const pathReader = (path) => {
    let arrFinal = [];
    if (api.pathExists(path)) {
        const toAbsolute = api.convertPath(path)
        const dirOrFile = api.hasExtension(toAbsolute) // retorna ext = file, false = directory
        const getProperties = new Promise((resolve, reject) => {
            let properLink = {}
            if (dirOrFile) { // ext de file - Obs: Puede ser md, txt, jpeg, png, etc.
                if (dirOrFile === '.md') {
                    // const contentMD = api.readFile(toAbsolute)
                    // const arrayLinks = api.findLinks(toAbsolute)
                    // console.log(37, arrayLinks);
                    arrFinal = arrFinal.concat(api.findLinks(toAbsolute))
                    console.log(39, arrFinal);
                    arrFinal.forEach((el) => {
                        // console.log(40, toAbsolute+el);
                        properLink.href = el,
                        properLink.file = toAbsolute
                    })
                    resolve(properLink)
                } else {
                    properLink.href = 'Este no es un archivo markdown',
                    properLink.file = toAbsolute
                    reject(properLink)
                }
            } else { // dir - Obs: Puede contener files o subdirectorios
                const contentDir = api.readDir(toAbsolute) // retorna un array x c/d
                contentDir.forEach((element) => {
                    const unionPath = api.joinPath(toAbsolute, element) // console.log(unionPath);
                    const recurMainFunction = pathReader(unionPath)
                    arrFinal = arrFinal.concat(recurMainFunction)
                })
                return arrFinal
            }
            return properLink
        });
        getProperties.then((objeto) => {
            console.log(objeto);
        }).catch((error) => {
            console.log(error);
        })
        return getProperties
    } else {
        return 'Ruta inexistente'
    }
}
// console.log('directorio:', pathReader(objOfPaths.directory))
// console.log('archivoMD_1:', pathReader(objOfPaths.fileMd_1))
// console.log('archivoMD_1:', getFilesMd(objOfPaths.difFile))

// Esta f viene del api.js
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