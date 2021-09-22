const api = require('./api.js')

const objOfPaths = {
    directory: 'src/new_directory',
    fileMd_1: 'src/new_directory/toRead.md',
    fileMd_2: 'src/new_directory/inspectMe.md',
    difFile: 'src/new_directory/cheat.txt',
    wrongPath: 'src/assets/flowchart.jpg',
    sub_FileMd: 'src/new_directory/sub_dir/sub_file.md'
}

const mdLinks = (path) => {
    if (api.pathExists(path)) {
        const toAbsolute = api.convertPath(path)
        const dirOrFile = api.hasExtension(toAbsolute) // retorna ext = file, false = directory
        if (dirOrFile) { // ext de file - Obs: Puede ser md, txt, jpeg, png, etc.
            if (dirOrFile === '.md') {
                const contentMD = api.readFile(toAbsolute)
                const arrayLinks = api.findLinks(contentMD)
                return arrayLinks
            } else { 
                return 'Por el momento solo revisamos archivos markdown ^^'
            }
        } else { // dir - Obs: Puede contener files o subdirectorios
            const contentDir = api.readDir(toAbsolute) // es un array
            contentDir.forEach((element) => {
                const unionPath = api.joinPath(toAbsolute, element) // console.log(unionPath);
                const recurMainFunction = mdLinks(unionPath)
                console.log(recurMainFunction);
                // return recurMainFunction
            })
            // return contentDir // devuelve array
        }
    } else {
        const nonexistentPath = 'Ruta inexistente'
        return nonexistentPath
    }
}
// console.log('directorio:', mdLinks(objOfPaths.directory))
// console.log('archivoMD_1:', mdLinks(objOfPaths.fileMd_1))
console.log('archivoMD_2:', mdLinks(objOfPaths.fileMd_2))
// console.log('archivoTXT:', mdLinks(objOfPaths.difFile))
// console.log('ruta falsa:', mdLinks(objOfPaths.wrongPath))
// console.log('sub_archivoMD:', mdLinks(objOfPaths.sub_FileMd))