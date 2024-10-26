const mongoose = require('mongoose');


const CuisineSchema = new mongoose.Schema({
  cuisine: [{
    type: String,
    required: true,
    default: 'stater'
  }]
    
  },

  {timestamps: true}
);

const Cuisine = mongoose.model('Cuisine', CuisineSchema);

module.exports = { Cuisine }