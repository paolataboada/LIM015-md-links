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

// mdLinks("./some/example.md")
//   .then((links) => {
//     // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);

// La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), 
// donde cada objeto representa un link y contiene las siguientes propiedades:
// Con validate:false
// href: URL encontrada.
// text: Texto que aparecía dentro del link (<a>).
// file: Ruta del archivo donde se encontró el link.

const pathReader = (path) => {
    let arrFinal = [];
    if (api.pathExists(path)) {
        const toAbsolute = api.convertPath(path)
        const dirOrFile = api.hasExtension(toAbsolute) // retorna ext = file, false = directory
        const getProperties = new Promise((resolve, reject) => {
            let properLink = {}
            if (dirOrFile) { // ext de file - Obs: Puede ser md, txt, jpeg, png, etc.
                if (dirOrFile === '.md') {
                    const contentMD = api.readFile(toAbsolute)
                    const arrayLinks = api.findLinks(contentMD)
                    arrFinal = arrFinal.concat(arrayLinks)
                    arrFinal.forEach((el) => {
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
console.log('directorio:', pathReader(objOfPaths.directory))
// console.log('archivoMD_1:', pathReader(objOfPaths.fileMd_1))