
const { Fooditem } = require("../model/foodItemModel")
const { Seller } = require("../model/sellerModel")
const { handleImageUpload } = require("../utils/imageUpload")



const createFooditem = async (req,res,next) => {
    try {
        let imageUrl;
        //console.log(req.file,"=====image in controller")

        const{title, thumbnail, description, price,category,cuisines, rating,restuarants,sellers} = req.body
     console.log(req.body)
        if( !title || !description || !price ){
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const fooditemExist = await Fooditem.findOne({title})
            if(fooditemExist){

               return res.status(400).json({success: false, message: "fooditem is already exist"})
            }

           if(req.file){
            imageUrl = await handleImageUpload (req.file.path) // image is come with req.file.path
          
           }   
            
            const newFooditem = new Fooditem({title,thumbnail: imageUrl,description,price,cuisines,restuarants,rating,sellers,category});
            console.log(newFooditem,"=====newFooditem");
            

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
     const allFooditems = await Fooditem.find(req.query).populate('restuarants').populate('cuisines').populate('sellers')
     console.log(allFooditems, '====allfooditems')

if(allFooditems.length === 0)
    return res.status(400).json({success: false, message: "No foodItems found"})
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
const {fooditemId} = req.params
       const foodItem = await Fooditem.findById({_id: fooditemId}).populate('restuarants').populate('cuisines').populate('sellers').exec()
       console.log(foodItem, "====Fooditem")

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
        const seller = req.seller //save sellerAuth to seller
        const {title, thumbnail, description, price,rating,cuisineId,sellerId,restuarantId} = req.body;


        const isFooditemExist = await Fooditem.findOne({_id: fooditemId})
        if(!isFooditemExist){
            return res.status(400).json({success: false, message: "Fooditems does not exist"})
        }

       const sellerExist = await Seller.findOne({_id: seller.id})
       if(!sellerExist){
        return res.status(401).json({message: "seller not authorized"})
       }

      const updatedFooditem = await Fooditem.findOneAndUpdate ({_id: fooditemId}, {title, thumbnail, description, price, rating},{$push: {cuisines:{cuisineId}}},{$push: {sellers:{sellerId}}},{$push: {restuarants:{restuarantId}}}, {new: true, upsert: true}) 
        

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