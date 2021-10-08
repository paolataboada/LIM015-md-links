const api = require('./api.js')

const md_links = (path, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!api.path_exists(path)) {
            reject('La ruta introducida no existe')
        } else {
            if (!options.validate) {
                const valid_getproperties = api.get_mdfiles(path) !== 'Directorio vacío' ? api.get_properties(path) : 'Directorio vacío'
                resolve(valid_getproperties)
            } else {
                const valid_fetchstatus = api.get_mdfiles(path) !== 'Directorio vacío' ? api.fetch_status(path) : 'Directorio vacío'
                resolve(valid_fetchstatus)
            }
        }
    });
}

// const result = md_links('src/new_directory/sub_dir', {validate: false})
// const result = md_links('src/new_directory/toRead.md', {validate: true})
// const result = md_links('src/empty_dir', { validate: false })
// result.then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })

module.exports = md_links