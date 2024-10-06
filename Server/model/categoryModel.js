const mongoose = require('mongoose');


const MenuSchema = new Mongoose.Schema({
  category: {
    type: String,
    required: true
  }
    
  },

  {timestamps: true}
);

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = { Menu }