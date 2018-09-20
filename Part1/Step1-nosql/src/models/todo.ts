import { Schema, model } from "mongoose";

const todo: Schema = new Schema({
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
export default model('todo', todo);