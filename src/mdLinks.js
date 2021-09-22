const api = require('./api.js')

const objOfPaths = {
    directory: 'src/new_directory',
    fileMd_1: 'src/new_directory/toRead.md',
    fileMd_2: 'src/new_directory/inspectMe.md',
    difFile: 'src/new_directory/cheat.txt',
    wrongPath: 'src/assets/flowchart.jpg',
    sub_FileMd: 'src/new_directory/sub_dir/sub_file.md'
}

const validPath = (path) => {
    let arrFinal = [];
    if (api.pathExists(path)) {
        const toAbsolute = api.convertPath(path)
        const dirOrFile = api.hasExtension(toAbsolute) // retorna ext = file, false = directory
        if (dirOrFile) { // ext de file - Obs: Puede ser md, txt, jpeg, png, etc.
            if (dirOrFile === '.md') {
                const contentMD = api.readFile(toAbsolute)
                const arrayLinks = api.findLinks(contentMD)
                arrFinal.push(arrayLinks)
                return arrFinal
            } else { 
                return 'Por el momento solo revisamos archivos markdown ^^'
            }
        } else { // dir - O,bs: Puede contener files o subdirectorios
            const contentDir = api.readDir(toAbsolute) // es un array
            contentDir.forEach((element) => {
                const unionPath = api.joinPath(toAbsolute, element) // console.log(unionPath);
                const recurMainFunction = validPath(unionPath)
                arrFinal = arrFinal.concat(recurMainFunction)
            })
            return arrFinal
            // return contentDir // devuelve array
        }
    } else {
        const nonexistentPath = 'Ruta inexistente'
        return nonexistentPath
    }
}
// console.log('directorio:', validPath(objOfPaths.directory))
// console.log('archivoMD_1:', validPath(objOfPaths.fileMd_1))
// console.log('archivoMD_2:', validPath(objOfPaths.fileMd_2))
// console.log('archivoTXT:', validPath(objOfPaths.difFile))
// console.log('ruta falsa:', validPath(objOfPaths.wrongPath))
// console.log('sub_archivoMD:', validPath(objOfPaths.sub_FileMd))