const { User } = require("../model/userModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");

const userSignup = async (req,res,next) => {
    try {
        const {name,email, password, phone, profilePic,address} = req.body;

        if(!name || !email || !password ) {
         return res.status(400).json({success: false, message: "all fields is required"})
        }

        const isuserExist = await User.findOne({email})
        if(isuserExist){
            return res.status(400).json({success: false, message: "user already exist"})
        }
        const saltRounds = 10;

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        // console.log(hashedPassword, '====hashedPassword')

        const newUser = new User({name, email, password: hashedPassword, phone, profilePic,address})
        await newUser.save();

        const token = generateToken(newUser._id, 'user')
          //which name 'string' ('token') need to store data in cookies!
        res.cookie('token', token, {
            httpOnly: true, secure:true
        } ) //token means value of the string 'token'
        

        res.json({success: true, message: "User created sucessfully"})
        
    } catch (error) {
       console.log(error) 
       next(error);
    }
}

const userLogin = async (req,res,next) => {
    try {
        //check email and password is correctly fetched
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: "all fields are required"})
        }

        //check if the user is exist

        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(404).json({success: false, message: "User does not exist"})
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);

        if(!passwordMatch){
           return res.status(401).json({success: false, message: "Unauthorized access"})
        }

        const token = generateToken(userExist._id, 'user')
          //which name 'string' ('token') need to store data in cookies!
        res.cookie('token', token,  {
            httpOnly: true, secure:true
        } ) //token means value of the string 'token'

        res.json({success: true, message: "User Login sucessfully"})
        
        
    } catch (error) {
       console.log(error) 
       next(error);
    }
}

const userLogout = async (req,res,next) => {
    try {
        res.clearCookie("token");
        res.json({success:true, message: "User logout successfully"})
      
        
    } catch (error) {
       console.log(error) 
       next(error);
    }
}

const userProfile = async (req,res,next) => {
    try {
       const user = req.user // fetched the verifiedToken value from userAuth//
       console.log('======user verified', user)

    //const {id}= req.params// this is not needed when the id is passing with token//
       const userData = await User.findById({_id: user.id}) //using the id from token and verifiedToken value 'user'
       res.json({success: true, message: "User profile fetch successfully", data: userData})
        
    } catch (error) {
       console.log(error) 
       next(error);
    }
}

const checkUser = async (req,res,next) => {
    try {
       const user = req.user 
       
       if(!user){
        res.status(401).json({success: false, message: "Unauthorized user access"})
       }
       res.json({success: true, message: "User authorized"})
        
    } catch (error) {
       console.log(error) 
       next(error);
    }
}

const getAllUsers = async (req,res,next) =>{
    try {
        const {user} = req.user.id
        // const {id}= req.query
        const users = await User.find(user)
        if(!users){
            res.status(400).json({message:"Users is not fetched", success: false})
        }
        res.json({success: true, message: "users fetched successfully",data: users})
        
    } catch (error) {
       console.log(error) 
       next(error);
    }
}

const userUpdate = async (req,res,next) => {
    try {

        const {userId} = req.params
        const {name,email, password, phone, profilePic,address} = req.body;


        const isuserExist = await User.findOne({_id: userId})
        if(!isuserExist){
            return res.status(400).json({success: false, message: "user does exist"})
        }
       

      const updatedUser = await User.findOneAndUpdate( {_id: userId} , {name,email, password, phone, profilePic,address}, {new: true})
        

        res.json({success: true, message: "User updated sucessfully", data: updatedUser})
        
        
    } catch (error) {
       console.log(error) 
       next(error);
    }
}

const deleteUser = async (req,res,next) => {
    try {
       const {userId} = req.params;
       
       const deletedUser = await User.findOneAndDelete({_id: userId})
       if(!deletedUser){
        res.json({success: false, message: "user already deleted"})
       }

       res.json({success: true, message: "User profile deleted successfully", data: deletedUser})
        
    } catch (error) {
       next(error);
    }
}

module.exports = { userSignup, userLogin, userLogout, userProfile, checkUser, getAllUsers, userUpdate, deleteUser}