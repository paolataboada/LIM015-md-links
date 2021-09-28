const fetch = require('node-fetch')

fetch('https://www.youtube.com/watch?v=zT5yR2E-GGU&ab_channel=MitoCode')
    .then((res) => {
        // console.log(res.headers.get('set-cookie'));
        // console.log(res.headers.raw()['set-cookie']);
        // console.log(res.ok);
        // console.log(res.status);
        // console.log(res.statusText);
        // console.log(res.url);
    });

console.log(process.argv[1]);
console.log(process.argv.slice(1));

/* fetch('https://api.github.com/users/github')
    .then((res) => {
        // console.log(1, res.json());
        return res.json()
    })
    .then((json) => {
        console.log(2, json)
        return json
    })
    .catch((err) => {
        // console.log(3, err)
        return err
    }) */


// const mdLinks = require("md-links");

// mdLinks("./some/example.md")
//     .then((links) => {
//     // => [{ href, text, file }, ...]
//     })
//     .catch(console.error);


/* const http = require('http');

const handlerServer = (request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' })
    // response.writeHead(404, { 'Content-type': 'text/html' })
    response.write('<h1>Hola Mundo desde NodeJS</h1>');
    response.end();
}

const server = http.createServer(handlerServer); // Una vez inicializado el servidor, permanece escuchando el primer código ejecutado

server.listen(3000, () => {
    console.log('Server on port 3000')
}) */