const mongoose = require('mongoose');


const CartSchema = new Mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }],

      fooditems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fooditem',
        required: true
      }],
      orders :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
      }]
    
  },

  {timestamps: true}
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart }