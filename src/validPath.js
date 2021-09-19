const api = require('./api.js')
// convertPath
// hasExtension

const objOfPaths = {
    directory: 'src/new_directory',
    fileMd: 'src/new_directory/toRead.md',
    difFile: 'src/new_directory/cheat.txt',
    wrongPath: 'src/assets/flowchart.jpg'
}

const validPath = (path) => {
    if (api.pathExists(path)) {
        console.log('Ruta válida:', path)
        api.convertPath(path).then((pathConverted) => {
            console.log('Ruta convertida:', pathConverted)
        }).catch((err) => { throw (err)})
    } else {
        console.log('Ruta inexistente', path)
    }
}
validPath(objOfPaths.fileMd)