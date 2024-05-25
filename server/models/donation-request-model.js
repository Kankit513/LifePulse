const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationRequestSchema = new Schema(
    {
      donorName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10,
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
      },
      bloodGroup: {
        type: String,
        required: true,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
      },
      quantity: {
        type: Number,
        require: true,
        minLength: 1,
        maxLength: 10,
      },
      disease: {
        type: String,
      },
      status: {
        type: String,
        default: 'Pending'
      },
      userRef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      orgRef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      date: { 
        type: Date, 
        default: Date.now 
      },
    },
    { timestamps: true }
);

module.exports = mongoose.model('DonationRequest', donationRequestSchema);