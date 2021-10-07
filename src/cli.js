#!/usr/bin/env node
const mdLinks = require("./mdLinks"); // TODO: Revisar exportación de mdLinks {}
const chalk = require('chalk');
const yargs = require('yargs');

const argv = yargs
    .option('validate', {
        alias: 'valid',
        description: 'Valida links de archivos md',
        type: 'boolean',
    })
    .option('stats', {
        alias: 'stat',
        description: 'Estadísticas básicas del link',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

// console.log(21, argv.validate);
// mdLinks(argv._[0], { validate: argv.validate })
// .then((res) => {
//     console.log(24, res);
//     return res
// })
// .catch((err) => {
//     console.log(25, err.message);
// })

if (argv.validate) {
    console.log('The current time is: ', new Date().toLocaleTimeString());
}
/* 
if (argv._.includes('lyr')) {
    const year = argv.year || new Date().getFullYear();
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        console.log(`${year} is a Leap Year`);
    } else {
        console.log(`${year} is NOT a Leap Year`);
    }
} */

// console.log(argv);

// console.log(chalk.blackBright('Hello world!'));
// console.log(chalk.bold.rgb(10, 100, 200)('Hello!'));

// console.log(process.argv);
// var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

/* switch (myArgs[0]) {
case 'insult':
    console.log(myArgs[1], 'smells quite badly.');
    break;
case 'compliment':
    console.log(myArgs[1], 'is really cool.');
    break;
default:
    console.log('Sorry, that is not something I know how to do.');
} */