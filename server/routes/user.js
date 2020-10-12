const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

const salt = bcrypt.genSaltSync(15);

const app = express();

app.get('/users', (req, res) => {
  const limit = Number(req.query.limit || 5);
  const page = Number(req.query.page || 1);

  User.find({}, 'name email')
    .skip((page - 1) * limit)
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      User.countDocuments({}, (erro, total) => {
        if (erro) {
          return res.status(400).json({
            ok: false,
            erro,
          });
        }
        res.json({
          ok: true,
          total,
          users,
        });
      });
    });
});

app.post('/user', (req, res) => {
  const { body } = req;

  const user = new User({
    name: body.name,
    password: bcrypt.hashSync(body.password, salt),
    email: body.email,
    role: body.role,
    status: true,
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: userDB,
    });
  });
});

app.put('/user/:id', (req, res) => {
  const { id } = req.params;

  const localBody = _.pick(req.body, ['name', 'email', 'status', 'role']);

  // mongoose.set('useFindAndModify', false);
  User.findByIdAndUpdate(id, localBody, { new: true, runValidators: true }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: userDB,
    });
  });
});

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;

  // mongoose.set('useFindAndModify', false);
  User.findByIdAndRemove(id, (err, userDeletedDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (!userDeletedDB) {
      return res.status(400).json({
        ok: false,
        err: 'User not present in DB',
      });
    }

    res.json({
      ok: true,
      usuario: userDeletedDB,
    });
  });
});

module.exports = app;
