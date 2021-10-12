const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')

// Comprueba si la ruta existe
const path_exists = (route) => fs.existsSync(route) // retorna boolean

// Pregunta si es una ruta absoluta
const is_absolute = (route) => path.isAbsolute(route) // retorna boolean

// Transforma ruta relativa a ruta absoluta
const convert_path = (route) => is_absolute(route) ? route : path.resolve(route)

// Lee el archivo
const read_file = (route) => fs.readFileSync(route, 'utf-8') // retorna contenido del archivo

// Obtiene el contenido de un directorio
const read_dir = (route) => fs.readdirSync(route, 'utf-8') // retorna array

// Averigua si es archivo o carpeta
const has_extension = (route) => {
    if (path.parse(route).ext !== '') {
        const type_file = path.parse(route).ext;
        return type_file  // retorna extensión del archivo
    } else {
        return false // es un directorio
    }
}

// Une dos pedazos de ruta
const join_path = (dir, base) => path.join(dir, base)

/* -------------------------------------- API -------------------------------------- */

// Obtiene array de archivos md (rutas absolutas)
const get_mdfiles = (path) => {
    let md_files = [];
    if (path_exists(path)) {
        const path_absolute = convert_path(path)
        const type_file = has_extension(path_absolute) // file or directory
        if (type_file) { // Obs: Puede ser md, txt, jpeg, png, etc.
            if (type_file === '.md') {
                md_files = md_files.concat(path_absolute)
                return md_files
            } else {
                return 'Solo se revisan archivos markdown'
            }
        } else { // Obs: Puede contener files o subdirectorios
            const content_dir = read_dir(path_absolute)
            content_dir.forEach((file) => {
                const union_path = join_path(path_absolute, file)
                const recursive_function = get_mdfiles(union_path)
                md_files = md_files.concat(recursive_function)
            })
            return md_files.length !== 0 ? md_files : 'Directorio vacío'
        }
    } else {
        return 'Ruta inexistente'
    }
}

// Expresiones regulares para encontrar: url / nombre de url / nombre + url
const regex_link = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g;
const regex_name = /\[([\w\s\d\-+&#/\.[áéíóúÁÉÍÓÚü]+)\]/g;
const regex_namelink = /\[(.+?)\]\((https?.+?)\)/g;

// Obtiene array de objetos con propiedades de los links
const get_properties = (path) => {
    const array_properties = [];
    const just_files = get_mdfiles(path).filter(e => e !== 'Solo se revisan archivos markdown' && e !== 'Directorio vacío')
    just_files.forEach((mdfile) => {
        const content_file = read_file(mdfile);
        const matched_links = content_file.match(regex_namelink)
        if (matched_links) {
            matched_links.forEach((link) => {
                const href = link.match(regex_link).join();
                const text = link.match(regex_name).join().slice(1, -1);
                array_properties.push({
                    href,
                    text,
                    file: mdfile
                })
            });
            return array_properties
        } else { // caso: null
            array_properties.push({
                href: 'Archivo sin links',
                text: '',
                file: mdfile
            })
            return array_properties
        }
    })
    return array_properties
}

// Añade el status de los links a las propiedades
const fetch_status = (path) => {
    const add_properties = get_properties(path).map((element) => {
        const fetch_request = fetch(element.href)
            .then((response) => {
                const properties_fetch = {
                    href: element.href,
                    text: element.text,
                    file: element.file,
                    status: response.status,
                    case: response.ok ? 'ok' : 'fail'
                }
                return properties_fetch
            }).catch((error) => {
                const properties_fetch = {
                    href: element.href,
                    file: element.file,
                    text: element.text,
                    status: 400,
                    case: 'fail',
                }
                return properties_fetch
            })
        return fetch_request
    })
    return Promise.all(add_properties)
}
// fetch_status('src/new_directory')
// .then((resp) => console.log(128, resp))
// .catch((err) => console.log(129, err))

module.exports = {
    path_exists,
    is_absolute,
    convert_path,
    read_file,
    read_dir,
    has_extension,
    join_path,
    get_mdfiles,
    get_properties,
    fetch_status
}