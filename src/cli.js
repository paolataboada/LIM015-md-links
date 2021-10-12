#!/usr/bin/env node
const md_links = require('./mdLinks.js');
const chalk = require('chalk');

const path_file = process.argv[2];
const options = process.argv.slice(3); // separa los args (options)
const validate = options[0] === '--validate' || options[1] === '--validate';
const stats = options[0] === '--stats' || options[1] === '--stats';
const help = options[0] === '--help' || options[1] === '--h';

if (path_file) {
    if (options.length === 0) { // console.log('no hay argumentos');
        md_links(path_file, { validate: false })
            .then((res) => {
                res.forEach((p) => {
                    console.log(chalk.bold(path_file), p.href === 'Archivo sin links' ? chalk.gray(p.href) : chalk.underline(p.href), chalk.cyan(p.text))
                });
            })
            .catch((err) => {
                console.log('Introduzca la ruta adecuadamente; ej:', chalk.inverse('$ md-links ./some/example.md'),
                chalk.green('\nTip: Si la ruta contiene backlashs (\\) deberás cambiarlos por slashs (/) o agregar backlashs dobles (\\\\)'));
            })
    } else {
        if (validate) {
            md_links(path_file, { validate: true })
                .then((res) => {
                    const unique_links = {};
                    const broken_links = [];
                    res.forEach((p) => {
                        if (p.status >= 400) {
                            broken_links.push(p.status);
                        }
                        unique_links[p.href] = unique_links[p.href]
                            ? unique_links[p.href] + 1 : 1;
                    })
                    if (stats) {
                        console.log(chalk.bold('Total:'), res.length);
                        console.log(chalk.bold('Unique:'), Object.keys(unique_links).length);
                        console.log(chalk.bold('Broken:'), broken_links.length);
                    } else {
                        res.forEach((p) => {
                            const print_data = `${chalk.bold(path_file)} ${chalk.underline(p.href)} ${p.status >= 400 ? chalk.red(p.status, p.case) : chalk.green(p.status, p.case)} ${chalk.cyan(p.text)}`
                            const dont_print = `${chalk.bold(path_file)} ${chalk.gray(p.href)}`
                            console.log(p.href === 'Archivo sin links' ? dont_print : print_data);
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        } else if (stats) { // Estadísticas básicas
            md_links(path_file, { validate: true })
                .then((res) => {
                    const unique_links = {};
                    res.forEach((p) => {
                        unique_links[p.href] = unique_links[p.href]
                            ? unique_links[p.href] + 1 : 1;
                    })
                    console.log(chalk.bold('Total:'), res.length);
                    console.log(chalk.bold('Unique:'), Object.keys(unique_links).length);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else if (help) {
            console.log(chalk.yellow(`
            Tal vez quisiste decir...
                --validate
                --stats
                --validate --stats
                --stats --validate
            `));
        } else {
            console.log(chalk.yellow(`
            Opción desconocida...
            Introduzca '--help' junto a la ruta para obtener ayuda;
            ej: $ md-links ./some/example.md --help
            `));
        }
    }
} else {
    console.log('Introduzca una ruta para empezar; ej:', chalk.inverse('$ md-links ./some/example.md'));
}