const mongoose = require('mongoose');


const RestuarantSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    default: 'https://img.freepik.com/free-vector/hand-drawn-fast-food-frame_23-2147862451.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721779200&semt=ais_user'
  },
   restuarantName: {
    type: String,
    required: true
   },
   address: {
    buildingname: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true }
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
  menus:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  }],

  sellers:[{
   sellerId:{ type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true}
  }],
  categories:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
    
  },

  {timestamps: true}
);

const Restuarant = mongoose.model('Restuarant', RestuarantSchema);

module.exports = { Restuarant }