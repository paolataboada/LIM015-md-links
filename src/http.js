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

const fetch = require('node-fetch')

const url = fetch('https://github.com/paolataboada')
url.then((res) => {
    return res.json()
}).then((json) => {
    console.log(json)
}).catch((err) => {
    console.log(err)
})

// console.log(fetch);