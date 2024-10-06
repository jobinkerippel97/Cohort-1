const mongoose = require('mongoose');


const CartSchema = new Mongoose.Schema({
  thumbnail: {
    type: String,
    default: 'https://img.freepik.com/free-vector/hand-drawn-fast-food-frame_23-2147862451.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721779200&semt=ais_user'
  },
   restuarantName: {
    type: String,
    required: true
   },
   restuarantAdress: {
    type: String,
    required: true
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
    
  },

  {timestamps: true}
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart }