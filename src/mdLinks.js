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
        if (dirOrFile) { // ext de file - Obs: Puede ser md, txt, jpeg, png, etc.
            if (dirOrFile === '.md') {
                const contentMD = api.readFile(toAbsolute)
                const arrayLinks = api.findLinks(contentMD)
                // arrFinal.push(arrayLinks) // devuelve en arrays separados
                arrFinal = arrFinal.concat(arrayLinks)
                return arrFinal
            } else { 
                return 'Por el momento solo revisamos archivos markdown ^^'
            }
        } else { // dir - Obs: Puede contener files o subdirectorios
            const contentDir = api.readDir(toAbsolute) // es un array
            contentDir.forEach((element) => {
                const unionPath = api.joinPath(toAbsolute, element) // console.log(unionPath);
                const recurMainFunction = pathReader(unionPath)
                arrFinal = arrFinal.concat(recurMainFunction)
                // return arrFinal
            })
            return arrFinal
        }
    } else {
        const nonexistentPath = 'Ruta inexistente'
        return nonexistentPath
    }
}
// console.log('directorio:', pathReader(objOfPaths.directory))
// console.log('archivoMD_1:', pathReader(objOfPaths.fileMd_1))

const validPath = new Promise((resolve, reject) => {
    return resolve(pathReader(objOfPaths.fileMd_1))
});
// console.log(validPath);

const resultValidPath = () => {
    validPath.then((arr) => {
        arr.forEach((el) => {
            const fetchEl = fetch(el).then((res) => {
                // console.log(el);
                const propertiesLinks = {
                    href: res.url, //link,
                    text: res.ok, //'Texto que aparece dentro del link',
                    file: 'ruta' // Ruta del archivo donde se encontró el link.
                }
                // console.log(propertiesLinks);
            })
            // console.log(63, fetchEl);
        })
    })
}
resultValidPath()






// const readToValidate = (path) => {
//     const promesa = new Promise((resolve, reject) => {
//         return resolve(pathReader(path))
//     });
//     promesa.then((array) => {
//         let catchLinks = [];
//         const traverseMatrix = array.forEach((link) => {
//             fetch(link)
//                 .then((res) => {
//                     const propertiesLinks = {
//                         href: res.url, //link,
//                         text: res.ok, //'Texto que aparece dentro del link',
//                         file: path // Ruta del archivo donde se encontró el link.
//                     }
//                     catchLinks = catchLinks.concat(propertiesLinks)
//                     // console.log(66, catchLinks);
//                     return catchLinks
//                 })
//         })
//         return traverseMatrix
//     })
//     return promesa
// }
// console.log(79, readToValidate('src/new_directory/inspectMe.md'))

// href: URL encontrada.
// text: Texto que aparecía dentro del link (<a>).
// file: Ruta del archivo donde se encontró el link.

// const validPath = new Promise((resolve, reject) => {
//     resolve(pathReader('src/new_directory/inspectMe.md'))
// });

// let catchLink = [];
// validPath.then((array) => {
//     // console.log(1, array);
//     const traverseMatrix = array.map((link) => { // intentar expr para devolver solo links
//         console.log(typeof link);;
//         // console.log(61, link);
//         // fetch(link)
//         //     .then((res) => {
                    // console.log(res.ok);
                    // console.log(res.status);
                    // console.log(res.statusText);
                    // console.log(res.url);
//         //         const propertiesLinks = {
//         //             href: res.url, //link,
//         //             text: res.statusText, //'Texto que aparece dentro del link',
//         //             file: 'path' // Ruta del archivo donde se encontró el link.
//         //         }
//         //         // console.log(69, propertiesLinks);
//         //         catchLink = catchLink.concat(propertiesLinks)
//         //         return catchLink
//         //         // return propertiesLinks
//         //     })
//     })
//     // console.log(125, traverseMatrix);
//     // return traverseMatrix
//     return catchLink
// })