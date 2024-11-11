const { Restuarant } = require("../model/restuarantModel")
const { handleImageUpload } = require("../utils/imageUpload")
const { Seller } = require("../model/sellerModel")

const createRestuarant = async (req,res,next) => {
    try { 
    
        let imageUrl;
        const{thumbnail,restuarantName,address,rating,cuisines, menus, sellers} = req.body
        
        if( !restuarantName || !address ){   
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const restuarantExist = await Restuarant.findOne({restuarantName})
            if(restuarantExist){
                res.status(400).json({success: false, message: "Restuarant is already exist"})
            }  
       
            if(req.file){
                imageUrl = await handleImageUpload (req.file.path) // image is come with req.file.path
              
               }  

            const newRestuarant = new Restuarant({thumbnail: imageUrl,restuarantName,address,rating,cuisines,menus,sellers});
            // console.log(newRestuarant,"======newResto");
            

        await newRestuarant.save();
        res.json({success: true, message: "Restuarant created successfully!",  data: newRestuarant})

    } catch (error) {
        console.log(error)
    next(error)
    }
} 
    

const getAllRestuarants = async (req,res,next) => {

    // const {id} = req.query
    const allRestuarants = await Restuarant.find(req.query).populate('sellers').populate('menus').populate('cuisines')

    if(!allRestuarants){
       return res.status(400).json({success: false, message: "Restuarants not fetched "})
    }
    res.json({success: true, message: "Restuarants fetched successfuly", data: allRestuarants})
}
const getRestuarant = async (req,res,next) => {
    try {
      const {restuarantId} = req.params
       const restuarant = await Restuarant.findOne({_id: restuarantId}).populate('sellers').populate('menus').populate('cuisines')
       .exec();
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
   const seller = req.seller.id
        const {restuarantId}= req.params;
        const {restuarantName,address,cuisineId,rating,thumbnail, sellerId,menuId} = req.body;


        const isrestuarantExist = await Restuarant.findOne({_id: restuarantId})
        if(!isrestuarantExist){
            return res.status(400).json({success: false, message: "Restuarants does not exist"})
        }
        const sellerExist = await Seller.findOne({_id:seller})
        if(!sellerExist){
            return res.status(400).json({message: "seller not found"})
        }
       

      const updatedRestuarant = await Restuarant.findOneAndUpdate ({_id: restuarantId}, {restuarantName,address,rating,thumbnail},{$push:{cuisines:{cuisineId}}},{$push:{menus:{menuId}}},{$push:{sellers:{sellerId}}},{new: true,upsert: true}) //upsert: true for create a new course if the course is not existing
        

        res.json({success: true, message: "Restuarants updated sucessfully", data:updatedRestuarant})
        
        
    } catch (error) {
        console.log(error)
        next(error);
    }
}
const deleteRestuarant = async (req,res,next) => {
    try {
       const {restuarantId} = req.params;
       const seller = req.seller.id
       const deletedRestuarant = await Restuarant.findOneAndDelete({_id: restuarantId})
       if(!deletedRestuarant){
        res.json({success: false, message: "restuarant already deleted"})
       }
       const sellerExist = await Seller.findOne({_id:seller})
       if(!sellerExist){
           return res.status(400).json({message: "seller not found"})
       }
      

       res.json({success: true, message: "restuarant deleted successfully", data: deletedRestuarant})
        
    } catch (error) {
        console.log(error)
        next(error);
    }
}
module.exports = { createRestuarant, getAllRestuarants, getRestuarant,updateRestuarant, deleteRestuarant }