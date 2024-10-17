
const { Fooditem } = require("../model/foodItemModel")
const { handleImageUpload } = require("../utils/imageUpload")



const createFooditem = async (req,res,next) => {
    try {
        //console.log(req.file,"=====image in controller")

        const{title, thumbnail, description, price, cuisine, rating,users, restuarants, categories} = req.body
     
        if( !title || !description || !price ){
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const fooditemExist = await Fooditem.findOne({title})
            if(fooditemExist){

                
                res.status(400).json({success: false, message: "fooditem is already exist"})
            }
           if(req.file){
            console.log(req.file);
            
           imageUrl = await handleImageUpload (req.file.path) // image is come with req.file.path
             console.log(imageUrl);
             
           }   
            
            const newFooditem = new Fooditem({title,thumbnail: imageUrl,description,price,cuisine,rating});

        await newFooditem.save();
        res.json({success: true, message: "Fooditem created successfully!",  data: newFooditem})

    } catch (error) {
        console.log(error)
        next(error);
    }
}

const getAllFooditems = async (req,res,next) => {
    try {
         // const {id} = req.query
     const allFooditems = await Fooditem.find(req.query)

     if(!allFooditems){
        return res.status(400).json({success: false, message: "Fooditems is not fetched Successfully"})
     }
     res.json({success: true, message: "Fooditems fetched successfuly", data: allFooditems})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}

  
const getFooditem = async (req,res,next) => {
    try {

       const foodItem = await Fooditem.findOne(req.params.FooditemId).exec();
       console.log(fooditem, "====Fooditem")

       if(!foodItem){
        return res.status(400).json({success: false, message: "FoodItem is not fetched properly"})
       }
       res.json({success: true, message: "FoodItem fetch successfully", data: foodItem})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
const updateFooditem = async (req,res,next) => {
    try {

        const {fooditemId}= req.params;
        const {title, thumbnail, description, price, cuisine,  rating} = req.body;


        const isFooditemExist = await Fooditem.findOne({_id: fooditemId})
        if(!isFooditemExist){
            return res.status(400).json({success: false, message: "Fooditems does not exist"})
        }
       

      const updatedFooditem = await Fooditem.findOneAndUpdate ({_id: fooditemId}, {title, thumbnail, description, price, cuisine, rating}, {new: true}) 
        

        res.json({success: true, message: "Fooditems updated sucessfully", data: updatedFooditem})
        
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
const deleteFooditem = async (req,res,next) => {
    
    try {
       const {fooditemId} = req.params;
       
       const deletedFooditem = await Fooditem.findOneAndDelete({_id: fooditemId})
       if(!deletedFooditem){
        res.json({success: false, message: "fooditem already deleted"})
       }

       res.json({success: true, message: "fooditem deleted successfully", data: deletedFooditem})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
module.exports = { createFooditem, getAllFooditems, getFooditem, updateFooditem, deleteFooditem}