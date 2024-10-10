const mongoose = require('mongoose');


const OrderSchema = new Mongoose.Schema({
  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
  fooditems: [{
   fooditemsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
   }
  }],

  restuarants:[{
   restuarantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restuarant',
    required: true
   }
  }],res
  
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