const mongoose = require('mongoose');


const MenuSchema = new Mongoose.Schema({
   fooditems: [{
    fooditemId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true
    }  }],

   sellers: [{
    sellerId:{ type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true}
   }]
    
  },

  {timestamps: true}
);

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = { Menu }