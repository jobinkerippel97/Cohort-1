const { User } = require("../model/userModel");
const bcrypt = require('bcrypt');

const userSignup = async (req,res,next) => {
    try {
        const {name,email, password, phone, profilePic} = req.body;

        if(!name || !email || !password ) {
         return res.satus(400).json({success: false, message: "all fields is required"})
        }

        const isuserExist = await User.findOne({email})
        if(isuserExist){
            return res.satus(400).json({success: false, message: "user already exist"})
        }
        const saltRounds = 10;

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        // console.log(hashedPassword, '====hashedPassword')

        const newUser = new User({name, email, password: hashedPassword, phone, profilePic})

        await newUser.save();
        res.json({success: true, message: "User created sucessfully"})
        
    } catch (error) {
        console.log(error)
        res.satus(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}

module.exports = { userSignup }