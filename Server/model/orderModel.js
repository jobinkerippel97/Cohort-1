const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
  fooditems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fooditem',
    required: true
   
  }],

  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  }],
   paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid'],
    default: 'Pending'
   },
   
  orderStatus: {
    type: String,
    enum: ['Accepted', 'Pending', 'Preparing', 'Redy to Pickup', 'Out for Delivery', 'Delivered','Cancelled'],
    default: "Pending",
    required: true
  },
    
  },
 

  {timestamps: true}
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order }