'use strict';

const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  category: { type: String, default: 'ANIME'  },
  name: { type: String, default: 'default Random'  },
  price: { type: Number, default: 199  },
  tags: { type: String, default: 'default Random' },
  description: { type: String, default: 'default Random' },
  inventory: { type: Number, default: 100  },
  image: { type: String, default: 'https://s1.favim.com/orig/151117/anime-funny-luffy-manga-Favim.com-3585591.gif' },
});

const StoreModel = mongoose.model('Store', storeSchema);

module.exports = StoreModel;

