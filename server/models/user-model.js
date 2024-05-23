const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      role: {
        type: String,
        required: true,
        enum: ['consumer','donor','hospital','organisation','admin'],
      },
      username: {
        type: String,
        required: function () {
          if (this.role === 'consumer' || this.role === 'donor' || this.role === 'admin') {
            return true;
          }
          return false;
        },
      },
      bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
        required: function () {
          if (this.role === 'consumer' || this.role === 'donor') {
            return true;
          }
          return false;
        },
      },
      organisationName: {
        type: String,
        required: function () {
          if (this.role === 'organisation') {
            return true;
          }
          return false;
        },
      },
      hospitalName: {
        type: String,
        required: function () {
          if (this.role === 'hospital') {
            return true;
          }
          return false;
        },
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);