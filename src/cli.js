#!/usr/bin/env node
const mdLinks = require("./mdLinks");
const chalk = require('chalk');

const path_file = process.argv[2];
const options = process.argv.slice(3); // separa los args (options)
const validate = options[0] === '--validate' || options[1] === '--validate';
const stats = options[0] === '--stats' || options[1] === '--stats';
const help = options[0] === '--help' || options[1] === '--h';
// console.log(options);

if (options.length === 0) { // console.log('no hay argumentos');
    mdLinks(path_file, { validate: false })
        .then((res) => {
            res.forEach((propLink) => {
                console.log(path_file, propLink.href, propLink.text)
            });
        })
        .catch((err) => {
            console.log(err);
        })
} else {
    if (validate) {
        mdLinks(path_file, { validate: true })
            .then((res) => {
                const totalLinks = [];
                const uniqueLinks = [];
                const brokenLinks = [];
                res.forEach((propLink) => {
                    const saveHref = propLink['href']
                    const saveStatus = propLink['status'] <= 400 ? 'Todos bien' : 'Hay links rotos'
                    console.log(29, saveHref, saveStatus);
                    // uniqueLinks.push(propLink.href)
                    // brokenLinks.push(propLink.href)
                    if (stats) {
                        console.log(res);
                        // console.log('Imprimir total, unique y broken');
                    } else {
                        console.log(path_file, propLink.href, propLink.case, propLink.status, propLink.text)
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })
    } else if (stats) { // Estadísticas básicas
        mdLinks(path_file, { validate: true })
            .then((res) => {
                // const uniqueLinks = {};
                // const brokenLinks = [];
                // res.forEach((propLink) => {
                //     propLink[href]
                // })
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    } else if (help) {
        console.log(`
        Tal vez quisiste decir...
        --validate
        --stats
        --validate --stats
        `);
    } else {
        console.log(`
        Opción desconocida...
        Introduzca '--help' para obtener ayuda
        `);
    }
}
