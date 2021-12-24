const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);

// {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
