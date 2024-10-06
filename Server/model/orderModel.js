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
  sellers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
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
  },
    
  },
  OrderSchema.methods.calculateTotalprice = function() {
this.total = this.foods.reduce((total, food) => {
  return total + (food.price * food.quantity); //miltiply price by quandity
}, 0)
  },

  {timestamps: true}
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order }