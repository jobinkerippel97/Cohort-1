const { Menu } = require("../model/menuModel")
const { Seller } = require("../model/sellerModel")

const createMenu = async (req,res,next) => {
    try {
        const{fooditems,restuarants} = req.body
        const seller = req.seller.id

    //  console.log(fooditems, "====cuisine")

        if(!fooditems){
           return res.status(400).json({success: false, message: " all fields is required"}) }

            const menuExist = await Menu.findOne({fooditems})
            if(menuExist){
           res.status(400).json({success: false, message: "Menu is already exist"})
            }
            const sellerExist = await Seller.findOne({_id: seller})

            if(!sellerExist){
             return res.status(401).json({message: "seller not authorized"})
            }

            const newMenu =  new Menu({fooditems,restuarants})

        await newMenu.save();

        res.json({success: true, message: "menu created successfully!",  data: newMenu})
    } catch (error) {
        console.log(error)
        next(error);
    }
}
const getAllMenus = async (req,res,next) => {
    
    try {
         // const {id} = req.query
     const allMenus = await Menu.find(req.query).populate('restuarants').populate('fooditems')
    //  console.log(allMenus, '====allMenus')

if(allMenus.length === 0)
    return res.status(400).json({success: false, message: "No Menu found"})
     if(!allMenus){
        return res.status(400).json({success: false, message: "Menu is not fetched Successfully"})
     }
     res.json({success: true, message: "Menu fetched successfuly", data: allMenus})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
const getMenu = async (req,res,next) => {
    try {
const {menuId} = req.params
       const menu = await Menu.findById({_id: menuId}).populate('restuarants').populate('fooditems').exec()
    //    console.log(menu, "====menu")

       if(!menu){
        return res.status(400).json({success: false, message: "Menu is not fetched properly"})
       }
       res.json({success: true, message: "Menu fetch successfully", data: menu})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
const updatedMenu = async (req,res,next) => {
    try {

        const {menuId}= req.params;
        const seller = req.seller //save sellerAuth to seller
        const {sellerId,restuarantId} = req.body;


        const isFooditemExist = await Menu.findOne({_id: menuId})
        if(!isFooditemExist){
            return res.status(400).json({success: false, message: "Fooditems does not exist"})
        }

       const sellerExist = await Seller.findOne({_id: seller.id})
       if(!sellerExist){
        return res.status(401).json({message: "seller not authorized"})
       }

      const updatedMenu = await Menu.findOneAndUpdate ({_id: menuId},{$push: {sellers:{sellerId}}},{$push: {restuarants:{restuarantId}}}, {new: true}) 
        

        res.json({success: true, message: "Fooditems updated sucessfully", data: updatedMenu})
        
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
const deletedMenu = async (req,res,next) => {
    
    try {
       const {menuId} = req.params;
       const seller = req.seller //save sellerAuth to seller
       
       const deletedMenu = await Menu.findOneAndDelete({_id: menuId})
       if(!deletedMenu){
        res.json({success: false, message: "Menu already deleted"})
       }

       const sellerExist = await Seller.findOne({_id: seller.id})
       if(!sellerExist){
        return res.status(401).json({message: "seller not authorized"})
       }
       res.json({success: true, message: "Menu deleted successfully", data: deletedMenu})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
module.exports = {createMenu,getAllMenus,getMenu,updatedMenu, deletedMenu}