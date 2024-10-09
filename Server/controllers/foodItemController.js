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
    //   update is not working properly
       const fooditemUpdate = await Fooditem.findByIdAndUpdate(req.params.FooditemId, req.body, {new: true})
       console.log(fooditemUpdate)

       if(!fooditemUpdate){
       return res.status(400).json({success: false, message: "fooditem is not updated properly"})
}
       res.json({success: true, message: "Fooditem updated successfully", data: fooditemUpdate})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
const deleteFooditem = async (req,res,next) => {
    try {
       const fooditemId = req.params.id
       const deleteFooditem = await Fooditem.findOneAndDelete(fooditemId)

       res.json({success: true, message: "Fooditem deleted successfully", data: deleteFooditem})
        
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
    }
}
module.exports = { createFooditem, getAllFooditems, getFooditem, updateFooditem, deleteFooditem}