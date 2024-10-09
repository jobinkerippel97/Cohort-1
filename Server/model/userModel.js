const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 80
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true

    },

    phone: {
        type: String,
        required: true
    },
    address: {
        houseNo: String,
        street: String,
        pinCode: String,
        state: String
    },

    profilePic: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s'
    },
    fooditems: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Fooditem'
    }]

  },

  {timestamps: true}
);

const User = mongoose.model('User', UserSchema);

module.exports = { User }