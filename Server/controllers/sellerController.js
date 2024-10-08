const bcrypt = require('bcrypt');
const { Seller } = require('../model/sellerModel');
const { generateToken } = require('../utils/token');



const sellerSignup = async (req,res,next) => {
    try {
        const {name,email, password, phone, profilePic,foodItems, orders, menus} = req.body;
        

        if(!name || !email || !password ) {
         return res.status(400).json({success: false, message: "all fields is required"})
        }

        const sellerExist = await Seller.findOne({email})
        if(sellerExist){
            return res.status(400).json({success: false, message: "seller already exist"})
        }
        const saltRounds = 10;

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        // console.log(hashedPassword, '====hashedPassword')

        const newSeller = new Seller({name, email, password: hashedPassword, phone, profilePic})
        await newSeller.save();

        const token = generateToken(newSeller._id, 'seller')
          //which name 'string' ('token') need to store data in cookies!
        res.cookie('token', token, {
            httpOnly: true, secure:true
        } ) //token means value of the string 'token'
        console.log(token)
        

        res.json({success: true, message: "Seller sign-up sucessfully"})
        
        res.status(400).json({message: "somting went wrong"})
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const sellerLogin = async (req,res,next) => {
    try {
        //check email and password is correctly fetched
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: "all fields are required"})
        }

        //check if the seller is exist

        const issellerExist = await Seller.findOne({email})
        if(!issellerExist){
            return res.status(404).json({success: false, message: "Seller does not exist"})
        }

        const passwordMatch = bcrypt.compareSync(password, issellerExist.password);

        if(!passwordMatch){
           return res.status(401).json({success: false, message: "Unauthorized access"})
        }

        const token = generateToken(issellerExist._id, 'seller')
          //which name 'string' ('token') need to store data in cookies!
        res.cookie('token', token,  {
            httpOnly: true, secure:true
        } ) //token means value of the string 'token'

        res.json({success: true, message: "Seller Login sucessfully"})
        
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}

const sellerLogout = async (req,res,next) => {
    try {
        res.clearCookie("token");
        res.json({success:true, message: "Seller logout successfully"})
      
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const sellerProfile = async (req,res,next) => {
    try {
       const seller = req.seller // fetched the verifiedToken value from userAuth//
       console.log('======seller verified', seller)

    //const {id}= req.params// this is not needed when the id is passing with token//
       const sellerData = await Seller.findById({_id: seller.id, role: seller}) //using the id from token and verifiedToken value 'seller'
       res.json({success: true, message: "seller profile fetch successfully", data: sellerData})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const checkSeller = async (req,res,next) => {
    try {
       const seller = req.seller
       
       if(!seller){
        res.status(401).json({success: false, message: "Unauthorized  access"})
       }
       res.json({success: true, message: "Seller authorized"})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const getAllSellers = async (req,res,next) =>{
    try {
        const seller = req.seller
        // const {id}= req.query
        const sellers = await Seller.find({seller})
        if(!sellers){
            res.status(400).json({message:"Sellers does not fetched", success: false})
        }
        res.json({success: true, message: "Sellers fetched successfully",data: sellers})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const sellerUpdate = async (req,res,next) => {
    try {
       const seller = req.seller
       
       
       const updateSeller = await Seller.findByIdAndUpdate({_id: seller.id})

       res.json({success: true, message: "Seller profile updated successfully", data: updateSeller})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const deleteSeller = async (req,res,next) => {
    try {
       const seller = req.seller 
       
       const deleteSeller = await Seller.findOneAndDelete({_id: seller.id})

       res.json({success: true, message: "Seller profile deleted successfully", data: deleteSeller})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}


module.exports = { sellerSignup, sellerLogin, sellerLogout, sellerProfile, checkSeller, getAllSellers , sellerUpdate, deleteSeller}