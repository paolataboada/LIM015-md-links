const http = require('http');

const handlerServer = (request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' })
    // response.writeHead(404, { 'Content-type': 'text/html' })
    response.write('<h1>Hola Mundo desde Nodejs</h1>');
    response.end();
}

const server = http.createServer(handlerServer); // Una vez inicializado el servidor, permanece escuchando el primer código ejecutado

server.listen(3000, () => {
    console.log('Server on port 3000')
})