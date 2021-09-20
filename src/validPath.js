const api = require('./api.js')
// convertPath
// hasExtension

const objOfPaths = {
    directory: 'src/new_directory',
    fileMd: 'src/new_directory/toRead.md',
    difFile: 'src/new_directory/cheat.txt',
    wrongPath: 'src/assets/flowchart.jpg',
    absolPath: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\cheat.txt'
}

const validPath = (path) => {
    if (api.pathExists(path)) {
        const dirOrFile = api.hasExtension(api.convertPath(path))
        if (typeof dirOrFile === 'string') {
            return api.readFile(dirOrFile)
        } else {
            return dirOrFile
        }
    } else {
        const nonexistentPath = 'Ruta inexistente'
        return nonexistentPath
    }
}
console.log(validPath(objOfPaths.fileMd))