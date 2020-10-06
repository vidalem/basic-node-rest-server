const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


app.get('/', function (req, res) {

  // res.send('Helloaaa World')
  let salida = {
    nombre: 'vidal',
    edad: 47,
    url: req.url
  };

  res.send(salida);


});

app.listen(port, () => {
  console.log(`Lintening on port ${port}`);
});
