const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 20
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      trim: true
    },
    phone: {
      type: String,
      required:true
    },
 
   role: {
   type: String,
   enum: ['seller', 'admin'],
   default: 'seller'
   },
   fooditems : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fooditem'
   }],
   orders : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
   }],module
  },
{timestamps:true}
);

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = { Seller }