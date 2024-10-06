const mongoose = require('mongoose');


const CategorySchema = new Mongoose.Schema({
  category: [{
    type: String,
    required: true,
    default: 'stater'
  }]
    
  },

  {timestamps: true}
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category }