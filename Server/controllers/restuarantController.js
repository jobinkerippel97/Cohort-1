const { Restuarant } = require("../model/restuarantModel")

const createRestuarant = async (req,res,next) => {
    try {
        const{restuarantName,restuarantAdress,cuisine,rating,profilePic,sellers, categories} = req.body
        if( !restuarantName || !restuarantAdress || !cuisine ){
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const restuarantExist = await Restuarant.findOne({restuarantAdress})
            if(restuarantExist){
                res.status(400).json({success: false, message: "Restuarant is already exist"})
            }
  
            const newRestuarant = new Restuarant({restuarantName,restuarantAdress,cuisine, rating,profilePic});

        await newRestuarant.save();
        res.json({success: true, message: "Restuarant created successfully!",  data: newRestuarant})

    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error",})
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
      
       const restuarant = await Restuarant.findOne(req.params.RestuarantId).exec();
       console.log(restuarant, "====restuarant")

       if(!restuarant){
        return res.status(400).json({success: false, message: "restuarant is not fetched properly"})
       }
       res.json({success: true, message: "seller profile fetch successfully", data: restuarant})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const updateRestuarant = async (req,res,next) => {
    try {
    //   update is not working properly
       const restuarantUpdate = await Restuarant.findByIdAndUpdate(req.params.RestuarantId, req.body, {new: true})
       console.log(restuarantUpdate)

       if(!restuarantUpdate){
       return res.status(400).json({success: false, message: "resturant is not updated properly"})
}
       res.json({success: true, message: "Restuarant updated successfully", data: restuarantUpdate})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const deleteRestuarant = async (req,res,next) => {
    try {
       const restuarantId = req.params.id
       const deleteRestuarant = await Restuarant.findOneAndDelete(restuarantId)

       res.json({success: true, message: "Restuarant deleted successfully", data: deleteRestuarant})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
module.exports = { createRestuarant, getAllRestuarants, getRestuarant,updateRestuarant, deleteRestuarant }