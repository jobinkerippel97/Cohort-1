const mongoose = require('mongoose');


const MenuSchema = new Mongoose.Schema({
   fooditems: [{
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Fooditem',
    required: true
   }],

   Restuarants: [{
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Restuarant',
    required: true
   }]
    
  },

  {timestamps: true}
);

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = { Menu }