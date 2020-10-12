require('../config/config');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/user'));

app.get('/', (req, res) => {
  const salida = {
    nombre: 'vidal',
    edad: 47,
    url: req.url,
  };

  res.send(salida);
});

mongoose.connect('mongodb://localhost:27017/example',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;

    // console.log('Database ONLINE');
  });

app.listen(process.env.PORT, () => {
  // console.log(`Lintening on port ${process.env.PORT}`);
});
