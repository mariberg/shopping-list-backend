// model for collection users

const mongoose = require('mongoose');

// skeeman luonti. Skeema maarittaa kannassa olevan tiedon muodon
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 6, max: 20, lowercase: true }, // saves all usernames as lowercase
  password: { type: String, required: true, min: 8, max: 30 },
});

// Tehdaan skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan.
// Model on luokka, joka sisaltaa skeeman.
const User = mongoose.model('User', UserSchema);


module.exports = User;