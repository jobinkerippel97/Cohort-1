const mongoose = require('mongoose');

const RestuarantSchema = new mongoose.Schema({
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
      minLength: 8
    },
    phone: {
      type: String,
      required:true
    },
   restaurantName: {
    type: String,
    required: true
   },
   restaurantAdress: {
    type: String,
    required: true,
    minLength: 10,
   },
   cuisine: [{
    type: String,
    required: true,
    default: 'South Indian'
   }],
  rating: {
    type: String,
    enum: [1,2,3,4,5],
    default: 0
  },
   role: {
   type: String,
   enum: ['Restuarant', 'admin'],
   default: 'Restuarant'
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

const Restuarant = mongoose.model('Restuarant', RestuarantSchema);

module.exports = { Restuarant }