
const http = require('http');



http.createServer((req, res) => {
  res.write('HOla mundo');
  res.end();

}).listen(8090);

console.log('Escuchando puerto 8090');

