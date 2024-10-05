const mongoose = require('mongoose');


const UserSchema = new Mongoose.Schema({
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
        maxLength: 20
    },

    password: {
        type: String,
        required: true,
        minLength: 6

    },

    phone: {
        type: String,
        required: true
    },

    profilePic: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s'
    },

  },

  {timestamps: true}
);

const User = mongoose.model('User', UserSchema);

module.exports = { User }