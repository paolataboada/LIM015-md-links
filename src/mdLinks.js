const api = require('./api.js')

const mdLinks = (path, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!api.pathExists(path)) {
            reject('No existe la ruta')
        } else {
            if (!options.validate) {
                resolve(api.readFilesMd(path))
            } else {
                resolve(api.fetchStatus(path))
            }
        }
    });
}
// const result = mdLinks('C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory', {validate: false})
const result = mdLinks('C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory', {validate: true})

result.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})