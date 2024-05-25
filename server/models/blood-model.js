const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodSchema = new Schema(
    {
      bloodGroup: {
        type: String,
        required: true,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
      },
      unit: {
        type: Number,
        required: true,
      },
      orgRef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    }
);

module.exports = mongoose.model('Blood', bloodSchema);