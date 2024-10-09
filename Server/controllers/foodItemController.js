const { Fooditem } = require("../model/foodItemModel")



const createFooditem = async (req,res,next) => {
    try {
        const{title, thumbnail, description, price, cuisine,  rating} = req.body
        if( !title || !description || !price ){
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const fooditemExist = await Fooditem.findOne({title})
            if(fooditemExist){
                res.status(400).json({success: false, message: "fooditem is already exist"})
            }
  
            const newFooditem = new Fooditem({title,thumbnail,description,price,cuisine,rating});

        await newFooditem.save();
        res.json({success: true, message: "Fooditem created successfully!",  data: newFooditem})

    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error",})
    }
}

const getAllFooditems = async (req,res,next) => {
    try {
         // const {id} = req.query
     const allFooditems = await Fooditem.find(req.query)

     if(!allFooditems){
        return res.status(400).json({success: false, message: "Fooditems is not fetched "})
     }
     res.json({success: true, message: "Fooditems fetched successfuly", data: allFooditems})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
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
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
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
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
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
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
module.exports = { createFooditem, getAllFooditems, getFooditem, updateFooditem, deleteFooditem}