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
// console.log('archivoMD_2:', pathReader(objOfPaths.fileMd_2))
// console.log('archivoTXT:', pathReader(objOfPaths.difFile))
// console.log('ruta falsa:', pathReader(objOfPaths.wrongPath))
// console.log('sub_archivoMD:', pathReader(objOfPaths.sub_FileMd))
// console.log('sub_sub_dir:', pathReader('src/new_directory/sub_dir'))

const resultRead = (path) => {
    let catchLink = [];
    pathReader(api.convertPath(path)).forEach((link) => {
        fetch(link)
            .then((res) => {
                // console.log(res.ok);
                // console.log(res.status);
                // console.log(res.statusText);
                // console.log(res.url);
                const propertiesLinks = {
                    href: res.url, //link,
                    text: res.statusText, //'Texto que aparece dentro del link',
                    file: path
                }
                // console.log(propertiesLinks);
                catchLink.push(propertiesLinks)
            })
            return catchLink
    })
}
console.log(0, resultRead('src/new_directory/sub_dir'));

// href: URL encontrada.
// text: Texto que aparecía dentro del link (<a>).
// file: Ruta del archivo donde se encontró el link.