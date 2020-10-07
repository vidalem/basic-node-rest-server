require('../config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/usuario', function (req, res) {

  res.json('get Usuario');

});


app.post('/usuario', function (req, res) {

  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: "El nombre es necesario"
    })
  } else {
    res.json({
      persona: body
    });
  }
});


app.put('/usuario/:id', function (req, res) {

  let id = req.params.id;

  res.json({
    id
  });

});

app.delete('/usuario/:id', function (req, res) {

  let id = req.params.id;


  res.json({
    id
  });

});





app.get('/', function (req, res) {

  let salida = {
    nombre: 'vidal',
    edad: 47,
    url: req.url
  };

  res.send(salida);

});

app.listen(process.env.PORT, () => {
  console.log(`Lintening on port ${process.env.PORT}`);
});
