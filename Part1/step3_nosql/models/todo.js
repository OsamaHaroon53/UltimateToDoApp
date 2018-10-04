let mongoose = require('mongoose');
const Schema = mongoose.Schema;
let todo = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false,
  }
});
module.exports = mongoose.model('todo', todo);