const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validRoles = {
  values: ['USER_ROLE', 'ADMIN_ROLE'],
  message: '{VALUE} user role not admitted',
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is mandatory'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is mandatory'],
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    required: [true, 'role is mandatory'],
    enum: validRoles,
  },
  status: {
    type: Boolean,
    required: [true, 'status is required'],
  },

});

// overwrite toJSON method to avoid send password property back
userSchema.methods.toJSON = () => {
  const userJson = this;
  const userObject = userJson.toObject();
  delete userObject.password;

  return userObject;
};

// voy por el 98

userSchema.plugin(uniqueValidator, { message: '{PATH} email must be unique' });

module.exports = mongoose.model('user', userSchema);
