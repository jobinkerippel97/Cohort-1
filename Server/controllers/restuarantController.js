const { Restuarant } = require("../model/restuarantModel")

const createRestuarant = async (req,res,next) => {
    try {
        const{thumbnail,restuarantName,restuarantAdress,cuisine,rating,profilePic,categories, menus, fooditems} = req.body
        if( !restuarantName || !restuarantAdress || !cuisine ){
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const restuarantExist = await Restuarant.findOne({restuarantAdress})
            if(restuarantExist){
                res.status(400).json({success: false, message: "Restuarant is already exist"})
            }
  
            const newRestuarant = new Restuarant({thumbnail,restuarantName,restuarantAdress,cuisine,rating,profilePic});

        await newRestuarant.save();
        res.json({success: true, message: "Restuarant created successfully!",  data: newRestuarant})

    } catch (error) {
        console.log(error)
    next(error)
    }
} 
    

const getAllRestuarants = async (req,res,next) => {

    // const {id} = req.query
    const allRestuarants = await Restuarant.find(req.query)

    if(!allRestuarants){
       return res.status(400).json({success: false, message: "Restuarants not fetched "})
    }
    res.json({success: true, message: "Restuarants fetched successfuly", data: allRestuarants})
}
const getRestuarant = async (req,res,next) => {
    try {
      const {restuarantId} = req.params
       const restuarant = await Restuarant.findOne({_id: restuarantId}).exec();
       console.log(restuarant, "====restuarant")

       if(!restuarant){
        return res.status(400).json({success: false, message: "restuarant is not fetched properly"})
       }
       res.json({success: true, message: "Restuarants profile fetch successfully", data: restuarant})
        
    } catch (error) {
        console.log(error)
        next(error);
    }
}
const updateRestuarant = async (req,res,next) => {
    try {

        const {restuarantId}= req.params;
        const {restuarantName,restuarantAdress,cuisine,rating,profilePic, categories} = req.body;


        const isrestuarantExist = await Restuarant.findOne({_id: restuarantId})
        if(!isrestuarantExist){
            return res.status(400).json({success: false, message: "Restuarants does not exist"})
        }
       

      const updatedRestuarant = await Restuarant.findOneAndUpdate ({_id: restuarantId}, {restuarantName,restuarantAdress,cuisine,rating,profilePic,categories}, {new: true,upsert: true}) //upsert: true for create a new course ia the course is not existing
        

        res.json({success: true, message: "Restuarants updated sucessfully", data:updatedRestuarant})
        
        
    } catch (error) {
        console.log(error)
        next(error);
    }
}
const deleteRestuarant = async (req,res,next) => {
    try {
       const {restuarantId} = req.params;
       
       const deletedRestuarant = await Restuarant.findOneAndDelete({_id: restuarantId})
       if(!deletedRestuarant){
        res.json({success: false, message: "restuarant already deleted"})
       }

       res.json({success: true, message: "restuarant deleted successfully", data: deletedRestuarant})
        
    } catch (error) {
        console.log(error)
        next(error);
    }
}
module.exports = { createRestuarant, getAllRestuarants, getRestuarant,updateRestuarant, deleteRestuarant }