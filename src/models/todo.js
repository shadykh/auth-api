'use strict';


const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  assignee: { type: String,  required: true },
  dueDate: { type: String , required: true},
  complete:{ type: Boolean,  default: false },
  difficulty:{type: String,  default: '1', required: true},
});

const TodoModel = mongoose.model('Todo', todoSchema);


module.exports = TodoModel;