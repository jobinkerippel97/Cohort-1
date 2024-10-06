const mongoose  = require("mongoose");


const FooditemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
    thumbnail: {
       type: String,
        required: true,
        default: 'https://img.freepik.com/free-vector/hand-drawn-fast-food-frame_23-2147862451.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721779200&semt=ais_user'
    },
   description: {
    type: String,
    required: true,
   },
   price :{
    type: Number,
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
    default: 0,
    users: [{
      type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
    }],

    restuarants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restuarant',
      required: true
    }],
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }]

   }
  },
{timestamps:true}
);

const Fooditem = mongoose.model('Fooditem', FooditemSchema);

module.exports = { Fooditem }