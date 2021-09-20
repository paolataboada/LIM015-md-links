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
    return path.resolve(dirExample)
    // return new Promise((resolve, reject) => {
        /* if (!path.isAbsolute(dirExample)) {
            console.log(path.resolve(dirExample));
            return path.resolve(dirExample)
        } else {
            console.log('con', path.resolve(dirExample));
            console.log('dif', dirExample);
            // return dirExample
        } */
    // })
}
// convertPath('src/new_directory')

// Expresión regular para validar una url
const regExp = /https?:\/\/(www\.)?[A-z\d]+(\.[A-z]+)*(\/[A-z\?=&-\d]*)*/g

// Lee el archivo markdown
const readFile = (fileExample) => {
    // return new Promise((resolve, reject) => {
        return fs.readFileSync(fileExample, 'utf-8')
    // })
}
// console.log(readFile(file))

// Obtiene el contenido de un directorio
const readDir = (dirExample) => {
    // return new Promise((resolve, reject) => {
        return fs.readdirSync(dirExample, 'utf-8')
    // })
}
// console.log(readDir(dir));

// Averigua si es archivo o carpeta
const hasExtension = (fileExample) => {
    if (path.parse(fileExample).ext) {
        const typeFile = path.parse(fileExample).ext
        // console.log(typeFile);
        if(typeFile !== '.md') {
            const noMd = 'Archivo excluido :P';
            return noMd
            // console.log('Archivo excluido :P')
        } else {
            // const yesMd = 'Este archivo md sí puede leerse'
            return fileExample // readFile(fileExample)
            // console.log('Este archivo md sí puede leerse')
            // readFile(fileExample)
        }
    } else {
        // console.log('Leer directorio', fileExample)
        // readDir(fileExample)
        // const result = 'Es un directorio'
        // const dirContent = readDir(fileExample)
        return /* result //  */readDir(fileExample)
    }
}
// console.log(hasExtension(dir))

module.exports = {
    pathExists,
    convertPath,
    readFile,
    readDir,
    hasExtension
}