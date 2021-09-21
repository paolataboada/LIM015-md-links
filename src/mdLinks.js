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
    if (api.pathExists(path)) {
        const toAbsolute = api.convertPath(path)
        const dirOrFile = api.hasExtension(toAbsolute) // retorna true = file, false = directory
        if (dirOrFile) { // file - Obs: También retorna txt, jpeg, png, etc.
            if (dirOrFile === '.md') {
                // const readableMD = toAbsolute // TODO: Revisar si se puede omitir constante
                const contentMD = api.readFile(toAbsolute)
                const arrayLinks = api.findLinks(contentMD)
                if (!arrayLinks) {
                    return `No existen links en el archivo ${toAbsolute}`
                }
                return arrayLinks
            } else { 
                return 'Por el momento solo revisamos archivos markdown ^^'
            }
        } else { // dir con más files
            // const readableDir = toAbsolute
            const contentDir = api.readDir(toAbsolute) // es un array
            for (let i = 0; i < contentDir.length; i++) {
                const unionPaths = api.joinPath(toAbsolute, contentDir[i])
                const innerFiles = api.readFile(unionPaths)
                // const innerLinks = api.findLinks(innerFiles) // TODO: Aplicar recursividad
                // if (!innerLinks) {
                //     return `No existen links en el archivo ${i, unionPaths}`
                // } // TODO: Inspeccionar en caso de que se encuentre otra subcarpeta 😫
                console.log(innerFiles)
            }
            // return contentDir // devuelve array
        }
    } else {
        const nonexistentPath = 'Ruta inexistente'
        return nonexistentPath
    }
}
console.log('directorio:', validPath(objOfPaths.directory))
console.log('archivoMD_1:', validPath(objOfPaths.fileMd_1))
console.log('archivoMD_2:', validPath(objOfPaths.fileMd_2))
console.log('archivoTXT:', validPath(objOfPaths.difFile))
console.log('ruta falsa:', validPath(objOfPaths.wrongPath))
console.log('sub_archivoMD:', validPath(objOfPaths.sub_FileMd))