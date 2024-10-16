const mongoose = require('mongoose');
const { Fooditem } = require('./foodItemModel');


const CartSchema = new Mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      fooditems: [{
       fooditemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fooditem',
        required: true
       },
       price: {
        type: Number,
        required: true,

       },
       quantity: {       type: Number,
        required: true,
        default: 1,
        enum: [1,2,3,4,5]
       },
      }],
      totalPrice: {
        type: Number,
        required: true,
        default: 0
      },
    
  },

  {timestamps: true}
);artSchema.methods.calculateTotalPrice = function() {
  this.totalPrice = this.fooditems.reduce((total, Foofitem) => total + Fooditem.price * Fooditem.quantity,0)

  
}

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart }