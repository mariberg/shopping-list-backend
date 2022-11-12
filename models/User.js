// model for collection users

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 6, max: 20, lowercase: true }, // saves all usernames as lowercase
  password: { type: String, required: true, min: 8, max: 30 },
});


const User = mongoose.model('User', UserSchema);


module.exports = User;