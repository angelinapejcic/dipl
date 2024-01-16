var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'guest' },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date },
});

usersSchema.set('toJSON', { virtuals: true });

var users = mongoose.model('user', usersSchema);

exports = module.exports = users;

