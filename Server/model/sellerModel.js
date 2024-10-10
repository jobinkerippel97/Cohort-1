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
      maxLength: 50
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
 profilePic: {
  type: String,
  default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s'
 },

   role: {
   type: String,
   enum: ['seller', 'admin'],
   default: 'seller'
   },
   foodItems : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fooditem'
   }],
   orders : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
   }],
   menus : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
   }],
  },
{timestamps:true}
);

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = { Seller }