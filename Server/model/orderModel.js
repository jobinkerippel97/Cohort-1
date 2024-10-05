const mongoose = require('mongoose');


const OrderSchema = new Mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  fooditems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  restuarants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restuarant',
    required: true
  }],
  quantity: {
    type: Number,
    required: true,
    default: 1,
    enum: [1,2,3,4,5]
   },
   totalAmount: {
    type: String,
    required: true
   },

   paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid'],
    default: 'Pending'
   },
   deliveryAdress: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Accepted', 'Pending', 'Preparing', 'Redy to Pickup', 'Out for Delivery', 'Delivered','Cancelled'],
    default: "Pending",
    required: true
  }
    
  },

  {timestamps: true}
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order }