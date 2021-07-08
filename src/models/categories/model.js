'use strict';

const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  name: { type: String, default: 'default Random'  },
  displayName: { type: String, default: 'default Random' },
  description: { type: String, default: 'default Random' },
});

const CategoriesSchema = mongoose.model('Categories', categoriesSchema);

module.exports = CategoriesSchema;

