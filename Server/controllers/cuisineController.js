const { Cuisine } = require("../model/cuisineModel")
const { Seller } = require("../model/sellerModel")


const createCuisine = async (req,res,next) => {
    try {
        const{cuisine} = req.body
        const seller = req.seller
    //  console.log(cuisine, "====cuisine")
        if(!cuisine){
           return res.status(400).json({success: false, message: " fields is required"}) }

            const cuisineExist = await Cuisine.findOne({cuisine})
            if(cuisineExist){
           res.status(400).json({success: false, message: "Cuisine is already exist"})
            }
            const sellerExist = await Seller.findOne({_id: seller.id})

            if(!sellerExist){
             return res.status(401).json({message: "seller not authorized"})
            }

            const newCuisine = new Cuisine({cuisine});

        await newCuisine.save();
        res.json({success: true, message: "New Cuisine created successfully!",  data: newCuisine})

    } catch (error) {
        console.log(error)
        next(error);
    }
}

const getAllCuisines = async (req,res,next) => {
    try {
         // const {id} = req.query
     const allCuisines = await Cuisine.find(req.query)

     if(!allCuisines){
        return res.status(400).json({success: false, message: "Cuisines is not fetched Successfully"})
     }
     res.json({success: true, message: "Cuisines fetched successfuly", data: allCuisines})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
const getCuisine = async (req,res,next) => {
    try {
        const {cuisineId} = req.params;

       const cuisine = await Cuisine.findById({_id: cuisineId}).exec();
       console.log(cuisine, "====Cuisine")

       if(!cuisine){
        return res.status(400).json({success: false, message: "Specific Cuisine is not fetched properly"})
       }
       res.json({success: true, message: "Cuisine fetch successfully", data: cuisine})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}

const updatedCuisine = async (req,res,next) => {
    try {

        const {cuisineId}= req.params;
        const seller = req.seller //save sellerAuth to seller
        const {cuisine} = req.body;


        const isCuisineExist = await Cuisine.findOne({_id: cuisineId})
        if(!isCuisineExist){
            return res.status(400).json({success: false, message: "Cuisine does not exist"})
        }

       const sellerExist = await Seller.findOne({_id: seller.id})
       if(!sellerExist){
        return res.status(401).json({message: "seller not authorized"})
       }

      const updatedCuisine = await Cuisine.findOneAndUpdate ({_id: cuisineId}, {cuisine}, {new: true}) 
        

        res.json({success: true, message: "Cuisine updated sucessfully", data: updatedCuisine})
        
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
const deleteCuisine = async (req,res,next) => {
    
    try {
       const {cuisineId} = req.params;
       const seller = req.seller
       
       const sellerExist = await Seller.findOne({_id: seller.id})
       if(!sellerExist){
        return res.status(401).json({message: "seller not authorized"})
       }

       const deletedCuisine = await Cuisine.findOneAndDelete({_id: cuisineId})
       if(!deletedCuisine){
        res.json({success: false, message: "cuisine already deleted"})
       }

       res.json({success: true, message: "cuisine deleted successfully", data: deletedCuisine})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
module.exports = {createCuisine,getAllCuisines, getCuisine, updatedCuisine,deleteCuisine}
