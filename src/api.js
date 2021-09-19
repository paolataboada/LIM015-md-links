#!/usr/bin/env node --no-warnings

const path = require('path')
const fs = require('fs')

// Rutas de ejemplo
const dir = 'src/new_directory'
const file = 'src/new_directory/inspectMe.md'
const dif = 'src/new_directory/cheat.txt'

// Comprueba si la ruta existe
const pathExists = (dirExample) => {
    return fs.existsSync(dirExample) // retorna booleano
}
// pathExists(file)

// Transforma ruta relativa a ruta absoluta
const convertPath = (dirExample) => {
    return new Promise((resolve, reject) => {
        if (!path.isAbsolute(dirExample)) {
            // const pathConverted = path.resolve(dirExample)
            // console.log('Se transformó a ruta absoluta:', pathConverted)
            return resolve(path.resolve(dirExample))
        } else {
            // console.log('Esta ya es una ruta absoluta:', dirExample)
            return reject('Esta ya es una ruta absoluta:')
        }
    })
}
// convertPath('C:/Users/TACNA/Documents/GitHub/LIM015-md-links/src/new_directory')

// Expresión regular para validar una url
const regExp = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g

// Lee el archivo markdown
const readFile = (fileExample) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileExample, 'utf-8', (err, data) => {
            let arrayLinks;
            if (err) {
                return reject(err)
            } else {
                // console.log(data)
                return resolve(data)
                /* const similarPatterns = data.match(regExp);
                arrayLinks = (similarPatterns);
                console.log(`Este es un array con ${arrayLinks.length} links:`, arrayLinks); */
            }
        })
    })
}
// readFile(file)

// Obtiene el contenido de un directorio
const readDir = (dirExample) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirExample, (err, files) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(files)
                /* const arrayFiles = files
                console.log(arrayFiles)
                for (let i = 0; i < arrayFiles.length; i++) {
                    const resultPath = path.join(dirExample, arrayFiles[i])
                    console.log('Para leer:', resultPath)
                } */
            }
        })
    })
}
// readDir(dir)

// Averigua si es archivo o carpeta
const hasExtension = (fileExample) => {
    if (path.parse(fileExample).ext) {
        const typeFile = path.parse(fileExample).ext
        console.log(typeFile);
        if(typeFile !== '.md') {
            console.log('Archivo excluido :P')
        } else {
            console.log('Este archivo md sí puede leerse')
            // readFile(fileExample)
        }
    } else {
        console.log('Leer directorio', fileExample)
        // readDir(fileExample)
        const result = 'Es un directorio'
        return result
    }
}
// hasExtension(dir)

/* exports.pathExists = pathExists;
exports.convertPath = convertPath;
exports.hasExtension = hasExtension; */

module.exports = {
    pathExists,
    convertPath,
    readFile,
    readDir,
    hasExtension
}